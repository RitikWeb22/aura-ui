import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { cx } from "../../utils/cx";
import "./Confetti.css";

export interface ConfettiHandle {
  fire: () => void;
}

export interface ConfettiProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
  colors?: string[];
  spread?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export const Confetti = forwardRef<ConfettiHandle, ConfettiProps>(
  (
    {
      particleCount = 60,
      colors = ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#06b6d4"],
      spread = 70,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    const fire = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const originX = rect.width / 2;
      const originY = rect.height / 2;

      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.random() - 0.5) * (spread * (Math.PI / 180)) - Math.PI / 2;
        const speed = Math.random() * 8 + 4;
        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          opacity: 1,
        });
      }

      particlesRef.current = newParticles;
      render();
    };

    useImperativeHandle(ref, () => ({
      fire,
    }));

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.014;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(p.opacity, 0);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      }

      if (alive) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 260;

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, []);

    return (
      <div className={cx("aura-confetti-wrapper", className)} style={style} {...props}>
        <canvas ref={canvasRef} className="aura-confetti-canvas" />
      </div>
    );
  }
);

Confetti.displayName = "Confetti";
