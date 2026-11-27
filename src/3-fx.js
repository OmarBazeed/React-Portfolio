// Ember / heat-wisp effect for the hero portrait. Canvas 2D, additive blending.
// Pauses when off-screen or hidden, adapts to slow devices, and renders a
// single still frame when the visitor prefers reduced motion.

function sprite(r, g, b) {
  const s = 64, c = document.createElement('canvas');
  c.width = c.height = s;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  gr.addColorStop(0, `rgba(${r},${g},${b},1)`);
  gr.addColorStop(0.35, `rgba(${r},${g},${b},.45)`);
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = gr;
  x.fillRect(0, 0, s, s);
  return c;
}

function loadImage(src) {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}

export function initHeroFx({ hero, canvas, visual, src }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const ctx = canvas.getContext('2d');
  const wc = document.createElement('canvas');
  wc.className = 'fx-canvas fx-wisps';
  wc.setAttribute('aria-hidden', 'true');
  hero.insertBefore(wc, canvas);
  const wx = wc.getContext('2d');
  const sprites = [sprite(255, 206, 110), sprite(255, 150, 50), sprite(230, 70, 25)];
  let W = 0, H = 0, dpr = 1, box = { x: 0, y: 0, w: 1, h: 1 };
  let edge = [], rim = null, running = false, raf = 0, last = 0, t = 0;
  let quality = 1, frames = 0, acc = 0, disposed = false;
  const mouse = { x: -9999, y: -9999, on: false };
  let dirX = 1; // drift toward the text side

  const MAX = coarse ? 260 : 520;
  const P = Array.from({ length: MAX }, () => ({ a: 0, x: 0, y: 0, vx: 0, vy: 0, l: 0, m: 1, s: 8, k: 0, z: 0 }));
  const WISPS = Array.from({ length: coarse ? 5 : 9 }, (_, i) => ({ u: Math.random(), v: Math.random(), s: 150 + Math.random() * 190, p: Math.random() * 6.28, i }));
  let spawnAcc = 0, burst = 1.6;

  function measure() {
    const hr = hero.getBoundingClientRect();
    const vr = visual.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    W = hr.width; H = hr.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    wc.width = Math.round(W / 2);
    wc.height = Math.round(H / 2);
    box = { x: vr.left - hr.left, y: vr.top - hr.top, w: vr.width, h: vr.height };
    dirX = getComputedStyle(document.documentElement).direction === 'rtl' ? 1 : -1;
    // portrait sits at the inline-end; embers drift toward the text side
    if (rim) {
      rim.width = Math.round(box.w * 1.24 * dpr);
      rim.height = Math.round(box.h * 1.24 * dpr);
      drawRim();
    }
  }

  function sampleEdges(img) {
    const n = 220, c = document.createElement('canvas');
    c.width = c.height = n;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0, n, n);
    const d = x.getImageData(0, 0, n, n).data;
    const a = (i, j) => (i < 0 || j < 0 || i >= n || j >= n ? 0 : d[(j * n + i) * 4 + 3]);
    const pts = [];
    for (let j = 2; j < n - 6; j++) for (let i = 2; i < n - 2; i++) {
      if (a(i, j) > 170 && (a(i - 3, j) < 60 || a(i + 3, j) < 60 || a(i, j - 3) < 60)) pts.push([i / n, j / n]);
    }
    return pts;
  }

  function drawRim() {
    if (!rim || !rim.__img) return;
    const x = rim.getContext('2d');
    const W2 = rim.width, H2 = rim.height, img = rim.__img;
    const w = Math.round(W2 / 1.24), h = Math.round(H2 / 1.24), ox = Math.round((W2 - w) / 2), oy = Math.round((H2 - h) / 2);
    x.clearRect(0, 0, W2, H2);
    const tmp = document.createElement('canvas');
    tmp.width = W2; tmp.height = H2;
    const q = tmp.getContext('2d');
    q.drawImage(img, ox, oy, w, h);
    q.globalCompositeOperation = 'source-in';
    q.fillStyle = '#ff7a2a';
    q.fillRect(0, 0, W2, H2);
    q.globalCompositeOperation = 'destination-out';
    q.drawImage(img, ox + w * 0.028 * dirX, oy + h * 0.022, w, h); // shift toward the text side, leaving the outer rim
    x.filter = `blur(${Math.max(8, w * 0.035)}px)`;
    x.globalAlpha = 0.8;
    x.drawImage(tmp, 0, 0);
    x.filter = `blur(${Math.max(1.5, w * 0.004)}px)`;
    x.globalAlpha = 1;
    x.drawImage(tmp, 0, 0);
    x.filter = 'none';
  }

  function spawn(p) {
    const e = edge[(Math.random() * edge.length) | 0];
    // bias toward hair / shoulders (upper part) by rejecting some lower points
    const ex = box.x + e[0] * box.w, ey = box.y + e[1] * box.h;
    const cx = box.x + box.w * 0.5, cy = box.y + box.h * 0.42;
    let nx = ex - cx, ny = ey - cy; const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L;
    p.a = 1; p.x = ex; p.y = ey;
    const sp = 14 + Math.random() * 38;
    p.vx = nx * sp + dirX * (10 + Math.random() * 40);
    p.vy = ny * sp * 0.5 - (18 + Math.random() * 46);
    p.m = p.l = 2.2 + Math.random() * 3.6;
    p.s = 1.6 + Math.pow(Math.random(), 3) * 9;
    p.k = Math.random();
    p.z = Math.random() * 6.28;
  }

  function drawWisps() {
    wx.setTransform(0.5, 0, 0, 0.5, 0, 0);
    wx.clearRect(0, 0, W, H);
    wx.globalCompositeOperation = 'lighter';
    for (const w of WISPS) {
      const px = box.x + box.w * (0.5 + 0.55 * Math.sin(t * 0.13 + w.p)) + dirX * (Math.sin(t * 0.21 + w.i) * 120);
      const py = box.y + box.h * (0.3 + 0.35 * Math.cos(t * 0.17 + w.p * 1.7));
      const s = w.s * (1 + 0.15 * Math.sin(t * 0.6 + w.p));
      wx.globalAlpha = 0.16 + 0.06 * Math.sin(t * 0.5 + w.p);
      wx.drawImage(sprites[w.i % 3 === 0 ? 2 : 1], px - s, py - s, s * 2, s * 2);
    }
    wx.globalAlpha = 1;
  }

  function step(dt) {
    t += dt;
    // fade trails
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.11)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawWisps();

    // emit
    if (edge.length) {
      spawnAcc += dt * (MAX / 4.2) * quality * (burst > 0 ? 3 : 1);
      burst -= dt;
      while (spawnAcc >= 1) {
        spawnAcc -= 1;
        const p = P.find(q => !q.a);
        if (!p) break;
        spawn(p);
      }
    }

    for (const p of P) {
      if (!p.a) continue;
      p.l -= dt;
      if (p.l <= 0) { p.a = 0; continue; }
      // gentle curl-like turbulence
      const ax = Math.sin(p.y * 0.012 + t * 0.9 + p.z) * 34 + Math.cos(p.x * 0.007 - t * 0.5) * 16;
      const ay = Math.cos(p.x * 0.011 + t * 0.7 + p.z) * 22 - 14;
      p.vx += ax * dt; p.vy += ay * dt;
      if (mouse.on) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000) { const f = (1 - d2 / 22000) * 520 * dt / (Math.sqrt(d2) + 20); p.vx += dx * f; p.vy += dy * f; }
      }
      const drag = Math.exp(-0.9 * dt);
      p.vx *= drag; p.vy *= drag;
      p.x += p.vx * dt; p.y += p.vy * dt;
      const f = p.l / p.m; // 1 -> 0
      const fade = Math.min(1, (1 - f) * 8) * Math.min(1, f * 1.6);
      const heat = f > 0.66 ? 0 : f > 0.3 ? 1 : 2;
      const s = p.s * (0.55 + 0.9 * f) * (1 + 0.2 * Math.sin(t * 6 + p.z));
      ctx.globalAlpha = Math.min(1, fade * (heat === 0 ? 0.8 : 0.62));
      ctx.drawImage(sprites[heat], p.x - s, p.y - s, s * 2, s * 2);
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    if (frames < 90) {
      acc += dt; frames++;
      if (frames === 90 && acc / 90 > 0.026) quality = 0.5; // slow device: halve emission
    }
    step(dt);
    raf = requestAnimationFrame(loop);
  }
  const start = () => { if (running || disposed || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  const io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? start() : stop())), { threshold: 0.02 });
  const onVis = () => (document.hidden ? stop() : (hero.getBoundingClientRect().bottom > 0 && start()));
  const onMove = e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
    const nx = (e.clientX / window.innerWidth - 0.5), ny = (e.clientY / window.innerHeight - 0.5);
    visual.style.setProperty('--px', (nx * -14).toFixed(1) + 'px');
    visual.style.setProperty('--py', (ny * -8).toFixed(1) + 'px');
  };
  const onLeave = () => { mouse.on = false; };
  const ro = new ResizeObserver(() => { measure(); if (reduce) still(); });

  function still() {
    // reduced motion: one calm frame, no loop
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    drawWisps();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 1;
    for (let i = 0; i < 90 && edge.length; i++) {
      const p = P[i % MAX]; spawn(p);
      const adv = Math.random() * 2.2;
      p.x += p.vx * adv; p.y += p.vy * adv; p.l = p.m * (1 - adv / 4.5);
      const f = Math.max(0.05, p.l / p.m);
      ctx.globalAlpha = 0.65 * Math.min(1, f * 1.6);
      const s = p.s * (0.55 + 0.9 * f);
      ctx.drawImage(sprites[f > 0.66 ? 0 : f > 0.3 ? 1 : 2], p.x - s, p.y - s, s * 2, s * 2);
    }
    ctx.globalAlpha = 1;
  }

  loadImage(src).then(img => {
    if (disposed) return;
    edge = sampleEdges(img);
    rim = document.createElement('canvas');
    rim.className = 'fx-rim';
    rim.setAttribute('aria-hidden', 'true');
    rim.__img = img;
    visual.appendChild(rim);
    measure();
    ro.observe(hero);
    io.observe(hero);
    document.addEventListener('visibilitychange', onVis);
    if (!coarse) { hero.addEventListener('pointermove', onMove); hero.addEventListener('pointerleave', onLeave); }
    if (reduce) still();
    document.documentElement.classList.add('fx-ready');
  }).catch(() => {});

  return () => {
    disposed = true; stop(); io.disconnect(); ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    hero.removeEventListener('pointermove', onMove);
    hero.removeEventListener('pointerleave', onLeave);
    if (rim && rim.parentNode) rim.parentNode.removeChild(rim);
    if (wc.parentNode) wc.parentNode.removeChild(wc);
  };
}
