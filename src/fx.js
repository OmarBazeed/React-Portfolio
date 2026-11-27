// Hero background: slow aurora glows plus silk-like flow lines that orbit
// behind the portrait. The photo itself is never touched.
// Pauses off-screen / hidden, caps pixel density, adapts to slow devices,
// and draws a single still frame for prefers-reduced-motion.

function glow(r, g, b) {
  const s = 128, c = document.createElement('canvas');
  c.width = c.height = s;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  gr.addColorStop(0, `rgba(${r},${g},${b},1)`);
  gr.addColorStop(0.5, `rgba(${r},${g},${b},.35)`);
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = gr;
  x.fillRect(0, 0, s, s);
  return c;
}

export function initHeroFx({ hero, canvas, visual }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const ctx = canvas.getContext('2d');
  const wc = document.createElement('canvas');
  wc.className = 'fx-canvas fx-wisps';
  wc.setAttribute('aria-hidden', 'true');
  hero.insertBefore(wc, canvas);
  const wx = wc.getContext('2d');
  const word = document.createElement('div');
  word.className = 'fx-word';
  word.setAttribute('aria-hidden', 'true');
  word.innerHTML = '<span>OMAR</span>';
  hero.insertBefore(word, wc.nextSibling);
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  const G = [glow(200, 40, 20), glow(255, 120, 40), glow(120, 20, 40), glow(255, 170, 80)];
  let W = 0, H = 0, dpr = 1, cx = 0, cy = 0, R = 300;
  let running = false, raf = 0, last = 0, t = 0, disposed = false;
  let quality = 1, frames = 0, acc = 0, px = 0, py = 0, tpx = 0, tpy = 0;

  const N = coarse ? 190 : 400;
  const L = Array.from({ length: N }, () => ({ x: 0, y: 0, life: 0, max: 1, s: 1, hue: 0 }));
  const BLOBS = [
    { g: 0, s: 0.95, fx: 0.07, fy: 0.05, ph: 0.0, a: 0.5 },
    { g: 1, s: 0.55, fx: 0.11, fy: 0.08, ph: 2.0, a: 0.32 },
    { g: 2, s: 1.2, fx: 0.05, fy: 0.06, ph: 4.0, a: 0.55 },
    { g: 3, s: 0.38, fx: 0.13, fy: 0.1, ph: 1.0, a: 0.22 },
  ];

  const n2 = (x, y, z) => Math.sin(x * 1.7 + z) * Math.cos(y * 1.3 - z * 0.7) + 0.5 * Math.sin((x + y) * 2.9 + z * 1.3);

  function measure() {
    const hr = hero.getBoundingClientRect();
    const vr = visual.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    W = hr.width; H = hr.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    wc.width = Math.round(W / 2); wc.height = Math.round(H / 2);
    cx = vr.left - hr.left + vr.width * 0.5;
    cy = vr.top - hr.top + vr.height * 0.4;
    R = Math.max(160, vr.width * 0.42);
    const fs = Math.min(vr.width * 0.5, (2 * (W - cx - 14)) / 2.95, (2 * (cx - 14)) / 2.95);
    word.style.fontSize = Math.max(60, fs).toFixed(1) + 'px';
    word.style.left = cx.toFixed(1) + 'px';
    word.style.top = (vr.top - hr.top + vr.height * 0.27 - fs * 0.76).toFixed(1) + 'px';
    if (reduce) still();
  }

  function respawn(p, fresh) {
    const a = Math.random() * 6.283;
    const r = R * (0.75 + Math.random() * 0.75);
    if (Math.random() < 0.8) { p.x = cx + Math.cos(a) * r; p.y = cy + Math.sin(a) * r * 0.9; }
    else { p.x = Math.random() * W; p.y = Math.random() * H; }
    p.max = p.life = 4 + Math.random() * 6;
    if (fresh) p.life = Math.random() * p.max;
    p.s = 0.6 + Math.random() * 0.8;
    p.hue = Math.random();
  }

  function advance(p, dt) {
    const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
    const k = Math.exp(-Math.pow((d - R) / (R * 0.9), 2)); // strongest on a ring around the head
    const tx = -dy / d, ty = dx / d; // tangent: orbit direction
    const a = n2(p.x * 0.004, p.y * 0.004, t * 0.12) * 1.4;
    const nx = Math.cos(a), ny = Math.sin(a);
    const sp = 38 * p.s;
    const vx = (tx * 1.1 * k + nx * (1 - 0.6 * k)) * sp;
    const vy = (ty * 1.1 * k + ny * (1 - 0.6 * k)) * sp - 3;
    const ox = p.x, oy = p.y;
    p.x += vx * dt; p.y += vy * dt;
    p.life -= dt;
    return [ox, oy];
  }

  function drawLines(dt) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    const warm = [], hot = [];
    const alphaOf = p => { const f = p.life / p.max; return Math.min(1, (1 - f) * 5) * Math.min(1, f * 3); };
    for (const p of L) {
      if (p.life <= 0) { respawn(p, false); continue; }
      const [ox, oy] = advance(p, dt);
      (p.hue > 0.82 ? hot : warm).push(ox, oy, p.x, p.y, alphaOf(p));
    }
    const stroke = (arr, col, amp) => {
      for (let i = 0; i < arr.length; i += 5) {
        ctx.strokeStyle = `rgba(${col},${(arr[i + 4] * amp).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(arr[i], arr[i + 1]); ctx.lineTo(arr[i + 2], arr[i + 3]); ctx.stroke();
      }
    };
    ctx.lineWidth = 1.1;
    stroke(warm, '255,132,72', 0.75);
    ctx.lineWidth = 1.4;
    stroke(hot, '255,214,160', 1);
  }

  function drawGlows() {
    wx.setTransform(0.5, 0, 0, 0.5, 0, 0);
    wx.clearRect(0, 0, W, H);
    wx.globalCompositeOperation = 'lighter';
    for (const b of BLOBS) {
      const s = R * 2.1 * b.s * (1 + 0.08 * Math.sin(t * 0.3 + b.ph));
      const x = cx + Math.sin(t * b.fx + b.ph) * R * 1.15 + px * 1.4;
      const y = cy + Math.cos(t * b.fy * 1.3 + b.ph) * R * 0.7 + py * 1.4;
      wx.globalAlpha = b.a * (0.8 + 0.2 * Math.sin(t * 0.4 + b.ph));
      wx.drawImage(G[b.g], x - s, y - s, s * 2, s * 2);
    }
    wx.globalAlpha = 1;
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now; t += dt;
    px += (tpx - px) * Math.min(1, dt * 2); py += (tpy - py) * Math.min(1, dt * 2);
    mx += (tmx - mx) * Math.min(1, dt * 3); my += (tmy - my) * Math.min(1, dt * 3);
    hero.style.setProperty('--mx', mx.toFixed(3)); hero.style.setProperty('--my', my.toFixed(3));
    if (frames < 90) { acc += dt; frames++; if (frames === 90 && acc / 90 > 0.026) quality = 0.5; }
    drawGlows();
    drawLines(dt * (quality < 1 ? 1.4 : 1));
    raf = requestAnimationFrame(loop);
  }
  const start = () => { if (running || disposed || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  function still() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of L) respawn(p, true);
    for (let i = 0; i < 260; i++) drawLines(0.06);
    t = 3; drawGlows();
  }

  const io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? start() : stop())), { threshold: 0.02 });
  const onVis = () => (document.hidden ? stop() : (hero.getBoundingClientRect().bottom > 0 && start()));
  const onMove = e => {
    tmx = e.clientX / window.innerWidth - 0.5;
    tmy = e.clientY / window.innerHeight - 0.5;
    tpx = tmx * 24; tpy = tmy * 14;
  };
  const ro = new ResizeObserver(measure);

  for (const p of L) respawn(p, true);
  measure();
  ro.observe(hero);
  io.observe(hero);
  document.addEventListener('visibilitychange', onVis);
  if (!coarse && !reduce) hero.addEventListener('pointermove', onMove);

  return () => {
    disposed = true; stop(); io.disconnect(); ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    hero.removeEventListener('pointermove', onMove);
    if (wc.parentNode) wc.parentNode.removeChild(wc);
    if (word.parentNode) word.parentNode.removeChild(word);
  };
}
