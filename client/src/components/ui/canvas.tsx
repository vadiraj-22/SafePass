interface WaveConfig {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Wave {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(e: WaveConfig = {}) {
    this.init(e);
  }

  init(e: WaveConfig) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    e = this.offset + Math.sin(this.phase) * this.amplitude;
    return e;
  }

  value() {
    return e;
  }
}



interface LineConfig {
  spring?: number;
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(e: LineConfig = {}) {
    this.init(e);
  }

  init(e: LineConfig) {
    this.spring = (e.spring || 0) + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let n = 0; n < E.size; n++) {
      const t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  }
  update() {
    let e = this.spring,
      t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (let n: any, i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (0 < i) {
        n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  }

  draw() {
    let e: any,
      t: any,
      n = this.nodes[0].x,
      i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[this.nodes.length - 2];
    t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

// @ts-ignore
function onMousemove(e: any) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
  // @ts-ignore
  function c(e: any) {
    e.touches
      ? // @ts-ignore
        ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
      : // @ts-ignore
        ((pos.x = e.clientX), (pos.y = e.clientY));
    e.preventDefault();
  }
  // @ts-ignore
  function l(e: any) {
    // @ts-ignore
    1 == e.touches.length &&
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
  }
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.addEventListener("mousemove", c);
  document.addEventListener("touchmove", c);
  document.addEventListener("touchstart", l);
  c(e);
  o();
  render();
}

function render() {
  // @ts-ignore
  if (ctx.running) {
    // @ts-ignore
    ctx.globalCompositeOperation = "source-over";
    // @ts-ignore
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // @ts-ignore
    ctx.globalCompositeOperation = "lighter";
    // Create a gradient that matches your purple-blue theme
    const hue = Math.round(f.update());
    // Map the hue to purple-blue range (270-240 degrees)
    const mappedHue = 270 - (hue % 60); // This will cycle between 270 (purple) and 210 (blue)
    // @ts-ignore
    ctx.strokeStyle = `hsla(${mappedHue}, 70%, 60%, 0.15)`;
    // @ts-ignore
    ctx.lineWidth = 8;
    for (var e: any, t = 0; t < E.trails; t++) {
      // @ts-ignore
      (e = lines[t]).update();
      e.draw();
    }
    // @ts-ignore
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  // @ts-ignore
  if (ctx && ctx.canvas) {
    // @ts-ignore
    ctx.canvas.width = window.innerWidth;
    
    // Calculate the maximum height needed to cover all content
    const body = document.body;
    const html = document.documentElement;
    
    // Get the full document height including all scrollable content
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    
    // Ensure canvas is at least viewport height but can be taller for scrollable content
    const canvasHeight = Math.max(window.innerHeight, documentHeight);
    
    // @ts-ignore
    ctx.canvas.height = canvasHeight;
    
    // Update canvas style to match
    // @ts-ignore
    ctx.canvas.style.height = canvasHeight + 'px';
  }
}

var ctx: any,
  f: Wave,
  e = 0,
  pos: Position = { x: 0, y: 0 },
  lines: Line[] = [],
  E = {
    debug: false,
    friction: 0.5,
    trails: 60, // Reduced for better performance and cleaner look
    size: 40,   // Slightly smaller for more elegant trails
    dampening: 0.025,
    tension: 0.98,
  };

interface Position {
  x: number;
  y: number;
}

class Node {
  x: number = 0;
  y: number = 0;
  vy: number = 0;
  vx: number = 0;
}

export const renderCanvas = function () {
  // @ts-ignore
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  
  // @ts-ignore
  ctx = canvas.getContext("2d");
  if (!ctx) return;
  
  // Prevent multiple initializations
  if (ctx.running) {
    // If already running, just resize and continue
    resizeCanvas();
    return;
  }
  
  ctx.running = true;
  ctx.frame = 1;
  f = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  
  // Remove existing listeners to prevent duplicates
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  
  // Add scroll listener to update canvas height
  window.addEventListener("scroll", resizeCanvas);
  
  // Add resize observer to watch for content changes
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(resizeCanvas, 50); // Small delay to ensure DOM is updated
    });
    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);
  }
  
  // Add mutation observer to watch for DOM changes
  if (window.MutationObserver) {
    const mutationObserver = new MutationObserver(() => {
      setTimeout(resizeCanvas, 100); // Delay to ensure layout is complete
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
  
  window.addEventListener("focus", () => {
    // @ts-ignore
    if (!ctx.running) {
      // @ts-ignore
      ctx.running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    // @ts-ignore
    ctx.running = true;
  });
  
  // Initial resize
  resizeCanvas();
  
  // Resize again after delays to ensure all content is loaded
  setTimeout(resizeCanvas, 100);
  setTimeout(resizeCanvas, 500);
  setTimeout(resizeCanvas, 1000);
};

// Export function to manually trigger canvas resize
export const forceCanvasResize = function() {
  resizeCanvas();
};