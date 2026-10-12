# AGENTS.md

Contrat de travail entre l'auteur du dépôt et les assistants IA qui y
interviennent. Règles techniques et de méthode uniquement.

## Projet

Site statique bilingue construit avec Astro. Anglais par défaut à la racine,
français sous `/fr/`. Aucun serveur applicatif : le build produit des fichiers
statiques dans `dist/`.

## Commandes

| Commande                   | Rôle                                     |
| -------------------------- | ---------------------------------------- |
| `npm run dev`              | Serveur de développement                 |
| `npm run check`            | Typage des fichiers Astro et TypeScript  |
| `npm run build`            | Build statique dans `dist/`              |
| `npm run preview`          | Sert `dist/` en local                    |
| `npm run check:links`      | Liens cassés sur `dist/` (build requis)  |
| `npm run check:lighthouse` | Lighthouse CI sur `dist/` (build requis) |

## Méthode

- Une étape = une branche `chantier/eNN-nom` = une PR vers `main`.
- Jamais de commit direct sur `main`. L'auteur relit et merge lui-même.
- Proposer un plan et attendre l'accord avant de coder.
- Commits petits, un par intention.
- Rester dans le périmètre de l'étape. Ce qui est exclu le reste, même si
  c'est tentant ; noter l'idée pour plus tard au lieu de la réaliser.
- En cas de contradiction entre une consigne et ce qui est constaté, signaler
  l'écart et demander. Ne pas trancher seul.
- Lancer réellement les contrôles et rapporter la sortie réelle. Ne jamais
  écrire qu'une chose « devrait marcher ».
- Ne jamais affaiblir un contrôle pour le faire passer (seuil baissé, page
  retirée, lien ignoré) sans accord explicite.

## Dépendances

- Aucune dépendance ajoutée sans validation préalable : nom, rôle, dev ou
  prod, et raison du choix par rapport aux alternatives.
- Même règle pour les actions GitHub utilisées en CI.
- npm uniquement. `package-lock.json` est versionné ; la CI utilise `npm ci`.
- Node : version LTS indiquée dans `.nvmrc`. La CI fait référence.

## Langue

- Anglais : README, messages de commit, titres et descriptions de PR,
  commentaires de code, noms de fichiers et d'identifiants.
- Français : ce fichier.

## Conventions techniques

### Routage et i18n

- i18n natif d'Astro : `defaultLocale: "en"`, `locales: ["en", "fr"]`,
  anglais sans préfixe, français sous `/fr/`.
- Toutes les URL de page se terminent par une barre oblique
  (`trailingSlash: "always"`, `build.format: "directory"`). Les liens
  internes, les URL canoniques et les `hreflang` suivent cette convention.
- Pas de redirection automatique selon la langue du navigateur.
- Chaque page passe par `BaseLayout`, qui pose `<html lang>`, le titre, la
  description, l'URL canonique et les liens `hreflang`.
- La liste des langues vit dans `src/i18n/locales.ts`. Ne pas la dupliquer.
- Un texte manquant dans une langue doit faire échouer le build, jamais
  produire un texte vide.

### Style

- CSS natif avec variables (custom properties).
- Aucun framework CSS, aucune librairie UI.

### TypeScript

- Configuration `strict` d'Astro. Pas de `any`, pas de `@ts-ignore` sans
  commentaire qui explique pourquoi.

### JavaScript côté navigateur

- Seulement ce qui est utile. Le site doit rester lisible sans JavaScript.

## Qualité

Seuils contrôlés en CI sur chaque page générée :

- Lighthouse Performance (mobile) : 95 minimum.
- Lighthouse Accessibilité, Bonnes pratiques, SEO : 100.
- Zéro lien cassé.
- Build et typage sans erreur ni avertissement.

Toute nouvelle page doit être ajoutée à la liste `url` de
`lighthouserc.json`.

## Confidentialité

Le dépôt est public. Aucun fichier, commit ou description de PR ne doit
contenir :

- de secret (clé, jeton, mot de passe) ; `.env` n'est jamais versionné ;
- de donnée personnelle ou de nom de tiers ;
- d'information interne à une organisation (code, adresses, noms de
  serveurs, URL internes) ;
- de contenu recopié depuis des documents de travail privés.

En cas de doute, ne pas écrire et demander.

## Avant d'ouvrir une PR

1. `npm run check`
2. `npm run build`
3. `npm run check:links`
4. `npm run check:lighthouse`
5. Vérifier les pages modifiées avec `npm run preview`, en anglais et en
   français.
6. Relire le diff : rien hors périmètre, rien de confidentiel.
