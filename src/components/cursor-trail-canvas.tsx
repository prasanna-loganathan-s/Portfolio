import { CSSProperties, useEffect, useRef } from "react";

export interface CursorTrailCanvasProps {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export default function CursorTrailCanvas(props: CursorTrailCanvasProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const { cleanUp, renderTrailCursor } = cursorTrail({
      ref: refCanvas,
      color: props.color,
    });
    renderTrailCursor();

    return () => {
      cleanUp();
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [props.color]);

  return (
    <canvas
      ref={refCanvas}
      className={props.className}
      style={props.style}
    ></canvas>
  );
}

import { RefObject } from "react";

export type CursorTrail = {
  ref: RefObject<HTMLCanvasElement>;
  color?: string;
};

export function cursorTrail(props: CursorTrail) {
  const colorRaw = getComputedStyle(document.documentElement).getPropertyValue(
    "--accent"
  );
  const accentColor = `hsla(${
    colorRaw ? colorRaw.split(" ").join(",") : "0, 0%, 0%"
  }, 0.35)`;
  const { ref, color } = props;
  const ctx = ref.current?.getContext("2d")!;

  // Adjusting animation features for increased density based on screen size
  const isMobile = window.innerWidth < 768; // Example breakpoint for mobile
  const AnimationFeature = {
    friction: 0.5,
    trails: isMobile ? 8 : 16, // Fewer trails on mobile/desktop to improve perf
    size: isMobile ? 16 : 24, // Smaller size for smoother rendering
    dampening: 0.2,
    tension: 0.98,
  };

  const cursorPosition = {
    x: 0,
    y: 0,
  };

  let running = true;

  class NewNode {
    x: number;
    y: number;
    vy: number;
    vx: number;
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }
  }

  class Line {
    spring: number;
    friction: number;
    nodes: NewNode[];

    constructor(e: {
      spring: number;
      cursorPosition?: { x: number; y: number };
    }) {
      this.spring = e.spring + 0.1 * Math.random() - 0.05;
      this.friction = AnimationFeature.friction + 0.01 * Math.random() - 0.005;
      const cursorPosition = e.cursorPosition ?? { x: 0, y: 0 };
      this.nodes = Array.from(
        { length: AnimationFeature.size },
        () => new NewNode()
      );
      this.nodes.forEach((node) => {
        node.x = cursorPosition.x;
        node.y = cursorPosition.y;
      });
    }

    update() {
      let e = this.spring;
      let t = this.nodes[0];
      t.vx += (cursorPosition.x - t.x) * e;
      t.vy += (cursorPosition.y - t.y) * e;

      for (let i = 0, a = this.nodes.length; i < a; i++) {
        t = this.nodes[i];
        if (i > 0) {
          const n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * AnimationFeature.dampening;
          t.vy += n.vy * AnimationFeature.dampening;
        }
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= AnimationFeature.tension;
      }
    }

    draw() {
      let n = this.nodes[0].x;
      let i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
        const e = this.nodes[a];
        const t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      const e = this.nodes[this.nodes.length - 2];
      const t = this.nodes[this.nodes.length - 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function renderAnimation() {
    if (running) {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = color || accentColor;
      ctx.lineWidth = 1;

      for (let t = 0; t < AnimationFeature.trails; t++) {
        if (newLines[t] !== undefined) {
          const line = newLines[t];
          line.update();
          line.draw();
        }
      }
      window.requestAnimationFrame(renderAnimation);
    }
  }

  const newLines: Line[] = [];

  function move(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      cursorPosition.x = event.clientX;
      cursorPosition.y = event.clientY;
    } else if (event.touches.length) {
      cursorPosition.x = event.touches[0].pageX;
      cursorPosition.y = event.touches[0].pageY;
    }
    event.preventDefault();
  }

  function createLine(event: TouchEvent) {
    if (event.touches.length === 1) {
      cursorPosition.x = event.touches[0].pageX;
      cursorPosition.y = event.touches[0].pageY;
    }
  }

  function onMouseMove(e: MouseEvent | TouchEvent) {
    function populateLines() {
      newLines.length = 0; // Clear previous lines
      for (let i = 0; i < AnimationFeature.trails; i++) {
        newLines.push(
          new Line({ spring: 0.45 + (i / AnimationFeature.trails) * 0.025 })
        );
      }
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchstart", onMouseMove);
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", createLine);
    document.addEventListener("touchstart", createLine);
    move(e);
    populateLines();
    renderAnimation();
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }

  function stopAnimation() {
    running = false;
  }

  function startAnimation() {
    if (!running) {
      running = true;
      renderAnimation();
    }
  }

  function renderTrailCursor() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onMouseMove);
    window.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", startAnimation);
    window.addEventListener("blur", stopAnimation);
    resizeCanvas();
  }

  function cleanUp() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("touchmove", createLine);
    document.removeEventListener("touchstart", createLine);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchstart", onMouseMove);
    window.removeEventListener("orientationchange", resizeCanvas);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("focus", startAnimation);
    window.removeEventListener("blur", stopAnimation);
    stopAnimation();
  }

  return { renderTrailCursor, cleanUp };
}
