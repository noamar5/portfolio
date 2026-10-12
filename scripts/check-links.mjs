// Checks every link of the generated site in dist/.
// Links to the production domain (canonical, hreflang) are rewritten to the
// local static server, so they are verified against this build and not
// against whatever is currently deployed.
import { readdir } from "node:fs/promises";
import { LinkChecker, LinkState } from "linkinator";

const DIST = "dist";
const PORT = 4173;
const SITE = "https://noa-marchionni.fr";

const entries = await readdir(DIST, { recursive: true });
const pages = entries.filter((entry) => entry.endsWith(".html")).sort();

if (pages.length === 0) {
  console.error(`No HTML page found in ${DIST}/. Run "npm run build" first.`);
  process.exit(1);
}

const checker = new LinkChecker();
checker.on("link", (link) => {
  if (link.state !== LinkState.SKIPPED) {
    console.log(
      `[${link.status ?? "---"}] ${link.state.padEnd(6)} ${link.url}`,
    );
  }
});

const result = await checker.check({
  path: pages,
  serverRoot: DIST,
  port: PORT,
  recurse: true,
  urlRewriteExpressions: [
    {
      pattern: new RegExp(`^${SITE.replaceAll(".", "\\.")}`),
      replacement: `http://127.0.0.1:${PORT}`,
    },
  ],
});

const broken = result.links.filter((link) => link.state === LinkState.BROKEN);
for (const link of broken) {
  console.error(
    `Broken link: ${link.url} (status ${link.status}) in ${link.parent}`,
  );
}

console.log(
  `\n${pages.length} pages scanned, ${result.links.length} links checked, ${broken.length} broken.`,
);
process.exit(broken.length > 0 ? 1 : 0);
