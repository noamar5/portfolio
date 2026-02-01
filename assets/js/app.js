// ----- Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ----- Canvas particles / constellations
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d", { alpha: true });

let w = 0, h = 0;
function resizeCanvas(){
  w = canvas.width = window.innerWidth * devicePixelRatio;
  h = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(1,0,0,1,0,0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const mouse = { x: null, y: null };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX * devicePixelRatio;
  mouse.y = e.clientY * devicePixelRatio;
});
window.addEventListener("mouseleave", () => {
  mouse.x = null; mouse.y = null;
});

function rand(min, max){ return Math.random() * (max - min) + min; }

const PARTICLE_COUNT = Math.round((window.innerWidth * window.innerHeight) / 18000);
const particles = [];

for(let i=0;i<PARTICLE_COUNT;i++){
  particles.push({
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-0.35, 0.35) * devicePixelRatio,
    vy: rand(-0.35, 0.35) * devicePixelRatio,
    r: rand(0.8, 1.8) * devicePixelRatio
  });
}

function draw(){
  ctx.clearRect(0,0,w,h);

  // voile léger pour un rendu "deep"
  ctx.fillStyle = "rgba(5, 9, 23, 0.18)";
  ctx.fillRect(0,0,w,h);

  // points
  for(const p of particles){
    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0) p.x = w;
    if(p.x > w) p.x = 0;
    if(p.y < 0) p.y = h;
    if(p.y > h) p.y = 0;

    // attraction subtile vers la souris
    if(mouse.x !== null){
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if(dist < 220 * devicePixelRatio){
        p.x -= dx * 0.00025;
        p.y -= dy * 0.00025;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = "rgba(106,168,255,0.85)";
    ctx.fill();
  }

  // liens entre points
  const maxLinkDist = 140 * devicePixelRatio;
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy);

      if(d < maxLinkDist){
        const alpha = 1 - (d / maxLinkDist);
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.18})`;
        ctx.lineWidth = 1 * devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();


// contact form (EmailJS)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  if (!form || !btn || !status) return;

  // EmailJS v4 init (public key)
  emailjs.init({ publicKey: "rcyKyxac1hk01LREP" });

  let tStatus = null;
  let tBtn = null;
  const openedAt = Date.now();

  const resetTimers = () => {
    if (tStatus) clearTimeout(tStatus);
    if (tBtn) clearTimeout(tBtn);
    tStatus = null;
    tBtn = null;
  };

  const setStatus = (text, type) => {
    status.textContent = text;
    status.classList.remove("success", "error");
    if (type) status.classList.add(type);
  };

  const setButton = (text, disabled) => {
    btn.textContent = text;
    btn.disabled = disabled;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetTimers();
	
	// Anti-spam (honeypot)
	const hp = form.querySelector('input[name="website"]');
	if (hp && hp.value.trim() !== "") {
		// On "fait comme si" c'était envoyé pour ne pas aider les bots
		setStatus("Message envoyé !", "success");
		form.reset();

		tBtn = setTimeout(() => setButton("Envoyer", false), 800);
		tStatus = setTimeout(() => setStatus("", null), 2000);
		return;
	}
	
	// Anti-bot : envoi trop rapide
	if (Date.now() - openedAt < 1500) {
		setStatus("Message envoyé !", "success");
		form.reset();

		tBtn = setTimeout(() => setButton("Envoyer", false), 800);
		tStatus = setTimeout(() => setStatus("", null), 2000);
		return;
	}


    setStatus("", null);
    setButton("Envoi...", true);

    emailjs
      .sendForm("service_9g7ph8n", "template_6f68wya", form)
      .then(() => {
        setStatus("Message envoyé !", "success");
        form.reset();

        setButton("Envoyé !", true);

        tBtn = setTimeout(() => {
          setButton("Envoyer", false);
        }, 1200);

        tStatus = setTimeout(() => {
          setStatus("", null);
        }, 4000);
      })
      .catch(() => {
        setStatus("Erreur ! Réessaie.", "error");
        setButton("Envoyer", false);
      });
  });
  
  
  // Favicon: static on mobile/Safari, animated on desktop
	(() => {
	const link = document.getElementById("favicon");
	if (!link) return;

	const size = 32;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");

	// Détection simple "mobile / Safari" => favicon statique
	const ua = navigator.userAgent.toLowerCase();
	const isMobile = /iphone|ipad|ipod|android/.test(ua);
	const isSafari = /^((?!chrome|android).)*safari/.test(ua);

	// Points style constellation
	const points = Array.from({ length: 9 }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
	}));

	function renderFrame(move = true) {
      ctx.clearRect(0, 0, size, size);

      // Optionnel: léger fond (transparent = ok aussi)
      // ctx.fillStyle = "rgba(5, 9, 23, 0.8)";
      // ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < points.length; i++) {
		const p = points[i];

		if (move) {
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < 1 || p.x > size - 1) p.vx *= -1;
			if (p.y < 1 || p.y > size - 1) p.vy *= -1;
		}

		// point
		ctx.beginPath();
		ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(160, 200, 255, 0.95)";
		ctx.fill();

		// liens
		for (let j = i + 1; j < points.length; j++) {
			const q = points[j];
			const dx = p.x - q.x;
			const dy = p.y - q.y;
			const d = Math.hypot(dx, dy);
			if (d < 14) {
				const a = 1 - d / 14;
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(q.x, q.y);
				ctx.strokeStyle = `rgba(124, 77, 255, ${0.25 * a})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}
		}
	  }

      link.href = canvas.toDataURL("image/png");
	}

	// ✅ Mobile / Safari: on génère UNE image statique via JS
	if (isMobile || isSafari) {
      renderFrame(false); // false = pas de mouvement
      return;
	}

	// ✅ Desktop: anim léger (10 fps)
	renderFrame(true);
	setInterval(() => renderFrame(true), 100);
	})();
});





