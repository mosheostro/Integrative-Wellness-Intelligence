/* ============================================================
   HOLOS — interactions + data visualization
   ============================================================ */
(function () {
  'use strict';

  /* ---------- THEME ---------- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('holos-theme'); } catch (e) {}
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('holos-theme', t); } catch (e) {}
    drawAll(); // redraw charts to pick up new theme colors
  }
  document.addEventListener('click', function (e) {
    var tb = e.target.closest('[data-theme-toggle]');
    if (tb) {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    }
  });

  /* ---------- NAV scroll state ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- LANG menu ---------- */
  document.addEventListener('click', function (e) {
    var lw = document.querySelector('.lang-wrap');
    if (!lw) return;
    if (e.target.closest('[data-lang-toggle]')) { lw.classList.toggle('open'); return; }
    var item = e.target.closest('[data-lang]');
    if (item) {
      lw.querySelectorAll('[data-lang]').forEach(function (b) { b.classList.remove('active'); });
      item.classList.add('active');
      var code = item.getAttribute('data-lang');
      var label = document.querySelector('[data-lang-label]');
      if (label) label.textContent = code.toUpperCase();
      if (window.HolosI18n) window.HolosI18n.set(code);
      requestAnimationFrame(drawAll);
      lw.classList.remove('open');
      return;
    }
    if (!e.target.closest('.lang-wrap')) lw.classList.remove('open');
  });

  /* ---------- MOBILE menu ---------- */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.menu-toggle')) {
      var links = document.querySelector('.nav-links');
      if (links) {
        var show = links.style.display !== 'flex';
        links.style.display = show ? 'flex' : '';
        links.style.cssText += show ? ';position:fixed;top:64px;left:16px;right:16px;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:12px;box-shadow:var(--shadow-md);z-index:99;' : '';
      }
    } else if (e.target.closest('.nav-links a')) {
      var l = document.querySelector('.nav-links');
      if (l && window.innerWidth <= 720) { l.style.display = ''; l.removeAttribute('style'); }
    }
  });

  /* ---------- FRAMEWORK tabs ---------- */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-fw]');
    if (!tab) return;
    var id = tab.getAttribute('data-fw');
    document.querySelectorAll('[data-fw]').forEach(function (t) { t.classList.toggle('active', t === tab); });
    document.querySelectorAll('[data-fw-panel]').forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-fw-panel') === id);
    });
    requestAnimationFrame(drawAll);
  });

  /* ---------- ASSESSMENT option select ---------- */
  document.addEventListener('click', function (e) {
    var opt = e.target.closest('.opt');
    if (!opt) return;
    var grid = opt.closest('.opt-grid');
    if (grid) grid.querySelectorAll('.opt').forEach(function (o) { o.classList.toggle('sel', o === opt); });
  });

  /* ---------- FAQ ---------- */
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.faq-q');
    if (!q) return;
    var item = q.closest('.faq-item');
    var a = item.querySelector('.faq-a');
    var open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
  });

  /* ---------- REVEAL on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
    io.observe(el);
  });

  /* ============================================================
     DATA VISUALIZATION  (SVG)
     ============================================================ */
  var NS = 'http://www.w3.org/2000/svg';
  function cssvar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888';
  }
  function el(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* ---- RADAR / LIFE BALANCE WHEEL ---- */
  function drawRadar(host) {
    var axes = JSON.parse(host.getAttribute('data-axes'));
    var vals = JSON.parse(host.getAttribute('data-vals'));
    var size = 260, cx = size / 2, cy = size / 2, R = size / 2 - 40, rings = 4;
    var svg = el('svg', { viewBox: '0 0 ' + size + ' ' + size, width: '100%' });
    var n = axes.length;
    var ink = cssvar('--ink'), faint = cssvar('--line'), sage = cssvar('--sage'), gold = cssvar('--gold');

    for (var r = 1; r <= rings; r++) {
      var pts = '';
      for (var i = 0; i < n; i++) {
        var a = (Math.PI * 2 * i / n) - Math.PI / 2;
        pts += (cx + Math.cos(a) * R * r / rings) + ',' + (cy + Math.sin(a) * R * r / rings) + ' ';
      }
      svg.appendChild(el('polygon', { points: pts, fill: 'none', stroke: faint, 'stroke-width': 1 }));
    }
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i / n) - Math.PI / 2;
      var x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
      svg.appendChild(el('line', { x1: cx, y1: cy, x2: x, y2: y, stroke: faint, 'stroke-width': 1 }));
      var lx = cx + Math.cos(a) * (R + 22), ly = cy + Math.sin(a) * (R + 16);
      var t = el('text', { x: lx, y: ly, 'text-anchor': 'middle', 'dominant-baseline': 'middle', fill: cssvar('--ink-faint'), 'font-size': 9, 'font-family': 'JetBrains Mono, monospace' });
      t.textContent = axes[i];
      svg.appendChild(t);
    }
    var dpts = '';
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i / n) - Math.PI / 2, rr = R * vals[i] / 100;
      dpts += (cx + Math.cos(a) * rr) + ',' + (cy + Math.sin(a) * rr) + ' ';
    }
    var grad = el('linearGradient', { id: 'rg' + Math.random().toString(36).slice(2, 7), x1: 0, y1: 0, x2: 1, y2: 1 });
    var gid = grad.getAttribute('id');
    grad.appendChild(el('stop', { offset: '0%', 'stop-color': sage, 'stop-opacity': 0.55 }));
    grad.appendChild(el('stop', { offset: '100%', 'stop-color': gold, 'stop-opacity': 0.45 }));
    svg.appendChild(grad);
    svg.appendChild(el('polygon', { points: dpts, fill: 'url(#' + gid + ')', stroke: sage, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i / n) - Math.PI / 2, rr = R * vals[i] / 100;
      svg.appendChild(el('circle', { cx: cx + Math.cos(a) * rr, cy: cy + Math.sin(a) * rr, r: 3, fill: cssvar('--bg'), stroke: sage, 'stroke-width': 2 }));
    }
    host.innerHTML = ''; host.appendChild(svg);
  }

  /* ---- PROGRESS RING ---- */
  function drawRing(host) {
    var val = +host.getAttribute('data-val');
    var color = cssvar(host.getAttribute('data-color') || '--sage');
    var size = 96, sw = 9, R = (size - sw) / 2 - 2, C = 2 * Math.PI * R, cx = size / 2;
    var svg = el('svg', { viewBox: '0 0 ' + size + ' ' + size, width: '100%' });
    svg.appendChild(el('circle', { cx: cx, cy: cx, r: R, fill: 'none', stroke: cssvar('--surface-2'), 'stroke-width': sw }));
    var arc = el('circle', { cx: cx, cy: cx, r: R, fill: 'none', stroke: color, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-dasharray': C, 'stroke-dashoffset': C, transform: 'rotate(-90 ' + cx + ' ' + cx + ')' });
    svg.appendChild(arc);
    var txt = el('text', { x: cx, y: cx, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: cssvar('--ink'), 'font-size': 22, 'font-family': 'Spectral, serif', 'font-weight': 500 });
    txt.textContent = val;
    svg.appendChild(txt);
    host.innerHTML = ''; host.appendChild(svg);
    requestAnimationFrame(function () {
      arc.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)';
      arc.setAttribute('stroke-dashoffset', C * (1 - val / 100));
    });
  }

  /* ---- FIVE ELEMENT WHEEL ---- */
  function drawElements(host) {
    var data = JSON.parse(host.getAttribute('data-elements'));
    var size = 240, cx = size / 2, cy = size / 2, R = 86;
    var svg = el('svg', { viewBox: '0 0 ' + size + ' ' + size, width: '100%' });
    svg.appendChild(el('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: cssvar('--line'), 'stroke-width': 1 }));
    svg.appendChild(el('circle', { cx: cx, cy: cy, r: R - 28, fill: 'none', stroke: cssvar('--line'), 'stroke-width': 1, 'stroke-dasharray': '2 5' }));
    var n = data.length, nodes = [];
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i / n) - Math.PI / 2;
      nodes.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, d: data[i] });
    }
    // generative cycle (ring) connections
    for (var i = 0; i < n; i++) {
      var p = nodes[i], q = nodes[(i + 1) % n];
      svg.appendChild(el('line', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: cssvar('--line'), 'stroke-width': 1 }));
    }
    for (var i = 0; i < n; i++) {
      var p = nodes[i];
      var rad = 14 + (p.d.v / 100) * 12;
      svg.appendChild(el('circle', { cx: p.x, cy: p.y, r: rad, fill: cssvar(p.d.c), 'fill-opacity': 0.92 }));
      var t = el('text', { x: p.x, y: p.y, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: cssvar('--bg'), 'font-size': 9.5, 'font-family': 'JetBrains Mono, monospace' });
      t.textContent = p.d.t;
      svg.appendChild(t);
    }
    host.innerHTML = ''; host.appendChild(svg);
  }

  /* ---- DOSHA / SPLIT BAR ---- */
  function drawBars(host) {
    var data = JSON.parse(host.getAttribute('data-bars'));
    var w = 300, rowH = 38, h = data.length * rowH;
    var svg = el('svg', { viewBox: '0 0 ' + w + ' ' + h, width: '100%' });
    data.forEach(function (d, i) {
      var y = i * rowH + 8;
      var lab = el('text', { x: 0, y: y + 6, fill: cssvar('--ink-soft'), 'font-size': 11, 'font-family': 'JetBrains Mono, monospace' });
      lab.textContent = d.t; svg.appendChild(lab);
      var bx = 70, bw = w - bx - 34;
      svg.appendChild(el('rect', { x: bx, y: y, width: bw, height: 7, rx: 4, fill: cssvar('--surface-2') }));
      var fill = el('rect', { x: bx, y: y, width: 0, height: 7, rx: 4, fill: cssvar(d.c) });
      svg.appendChild(fill);
      var val = el('text', { x: w, y: y + 6, 'text-anchor': 'end', fill: cssvar('--ink'), 'font-size': 11, 'font-family': 'Spectral, serif' });
      val.textContent = d.v; svg.appendChild(val);
      requestAnimationFrame(function () { fill.style.transition = 'width 1s cubic-bezier(.2,.8,.2,1)'; fill.setAttribute('width', bw * d.v / 100); });
    });
    host.innerHTML = ''; host.appendChild(svg);
  }

  /* ---- TREND SPARK ---- */
  function drawTrend(host) {
    var vals = JSON.parse(host.getAttribute('data-trend'));
    var w = 300, h = 80, pad = 6;
    var max = Math.max.apply(null, vals), min = Math.min.apply(null, vals);
    var svg = el('svg', { viewBox: '0 0 ' + w + ' ' + h, width: '100%' });
    var step = (w - pad * 2) / (vals.length - 1), pts = [];
    vals.forEach(function (v, i) {
      var x = pad + i * step, y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2 - 8);
      pts.push([x, y]);
    });
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var area = d + ' L' + pts[pts.length - 1][0] + ' ' + h + ' L' + pts[0][0] + ' ' + h + ' Z';
    var gid = 'tg' + Math.random().toString(36).slice(2, 7);
    var grad = el('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(el('stop', { offset: '0%', 'stop-color': cssvar('--indigo'), 'stop-opacity': 0.28 }));
    grad.appendChild(el('stop', { offset: '100%', 'stop-color': cssvar('--indigo'), 'stop-opacity': 0 }));
    svg.appendChild(grad);
    svg.appendChild(el('path', { d: area, fill: 'url(#' + gid + ')' }));
    svg.appendChild(el('path', { d: d, fill: 'none', stroke: cssvar('--indigo'), 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    var last = pts[pts.length - 1];
    svg.appendChild(el('circle', { cx: last[0], cy: last[1], r: 3.5, fill: cssvar('--indigo') }));
    host.innerHTML = ''; host.appendChild(svg);
  }

  function drawAll() {
    document.querySelectorAll('[data-axes]').forEach(drawRadar);
    document.querySelectorAll('[data-val]').forEach(drawRing);
    document.querySelectorAll('[data-elements]').forEach(drawElements);
    document.querySelectorAll('[data-bars]').forEach(drawBars);
    document.querySelectorAll('[data-trend]').forEach(drawTrend);
  }
  if (document.readyState !== 'loading') drawAll();
  else document.addEventListener('DOMContentLoaded', drawAll);
  window.addEventListener('load', drawAll);

  /* ---------- year ---------- */
  var y = document.querySelector('[data-year]'); if (y) y.textContent = new Date().getFullYear();
})();
