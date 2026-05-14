function initHexGrid() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const R = 34;
  const HW = R * Math.sqrt(3);
  const VH = R * 2;
  const VS = VH * 0.75;

  let edges = [], vtxEdges = new Map(), sparks = [];

  function buildGrid() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.ceil(canvas.width / HW) + 3;
    const rows = Math.ceil(canvas.height / VS) + 3;
    const edgeMap = new Map();

    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const cx = c * HW + (r % 2 ? HW / 2 : 0);
        const cy = r * VS;
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i - Math.PI / 6;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 6;
          const p1 = { x: cx + R * Math.cos(a1), y: cy + R * Math.sin(a1) };
          const p2 = { x: cx + R * Math.cos(a2), y: cy + R * Math.sin(a2) };
          const k1 = `${Math.round(p1.x)},${Math.round(p1.y)}`;
          const k2 = `${Math.round(p2.x)},${Math.round(p2.y)}`;
          const key = k1 < k2 ? `${k1}|${k2}` : `${k2}|${k1}`;
          if (!edgeMap.has(key)) edgeMap.set(key, { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, k1, k2 });
        }
      }
    }

    edges = [...edgeMap.values()];
    vtxEdges = new Map();
    for (const e of edges) {
      for (const k of [e.k1, e.k2]) {
        if (!vtxEdges.has(k)) vtxEdges.set(k, []);
        vtxEdges.get(k).push(e);
      }
    }

    sparks = Array.from({ length: 14 }, () => {
      const s = makeSpark();
      s.progress = Math.random();
      return s;
    });
  }

  function makeSpark(edge, fromKey) {
    const e = edge || edges[Math.floor(Math.random() * edges.length)];
    return { edge: e, progress: 0, speed: 0.005 + Math.random() * 0.009, fromKey: fromKey || e.k1 };
  }

  function advanceSpark(s) {
    s.progress += s.speed;
    if (s.progress < 1) return;
    const toKey = s.fromKey === s.edge.k1 ? s.edge.k2 : s.edge.k1;
    const next = (vtxEdges.get(toKey) || []).filter(e => e !== s.edge);
    if (!next.length) { Object.assign(s, makeSpark()); return; }
    const e = next[Math.floor(Math.random() * next.length)];
    s.edge = e;
    s.fromKey = toKey;
    s.progress = 0;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,209,0,0.04)';
    for (const e of edges) {
      ctx.beginPath();
      ctx.moveTo(e.x1, e.y1);
      ctx.lineTo(e.x2, e.y2);
      ctx.stroke();
    }

    for (const s of sparks) {
      const { edge, progress, fromKey } = s;
      const fwd = fromKey === edge.k1;
      const ox = fwd ? edge.x1 : edge.x2, oy = fwd ? edge.y1 : edge.y2;
      const dx = fwd ? edge.x2 : edge.x1, dy = fwd ? edge.y2 : edge.y1;
      const hx = ox + (dx - ox) * progress, hy = oy + (dy - oy) * progress;
      const tp = Math.max(0, progress - 0.45);
      const tx = ox + (dx - ox) * tp, ty = oy + (dy - oy) * tp;

      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, 'rgba(255,209,0,0)');
      grad.addColorStop(0.6, 'rgba(255,209,0,0.35)');
      grad.addColorStop(1, 'rgba(255,209,0,0.95)');

      ctx.save();
      ctx.shadowColor = '#ffd100';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.restore();

      advanceSpark(s);
    }

    requestAnimationFrame(draw);
  }

  buildGrid();
  window.addEventListener('resize', buildGrid);
  draw();
}
