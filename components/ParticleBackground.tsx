"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId: number;
    let particles: Particle[] = [];
    let isInView = true;
    let isPageVisible = document.visibilityState === "visible";
    let lastFrameTime = 0;
    const targetFrameDuration = 1000 / 24;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = Math.max(
        18,
        Math.floor((width * height) / 32000),
      );

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.18,
        opacity: Math.random() * 0.22 + 0.06,
      }));
    };

    const drawFrame = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -5) particle.x = width + 5;
        if (particle.x > width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = height + 5;
        if (particle.y > height + 5) particle.y = -5;

        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2,
        );

        context.fillStyle = `rgba(30, 27, 24, ${particle.opacity})`;
        context.fill();
      });
    };

    const animate = (timestamp: number) => {
      if (reducedMotionQuery.matches || !isInView || !isPageVisible) {
        animationFrameId = 0;
        return;
      }

      if (timestamp - lastFrameTime >= targetFrameDuration) {
        lastFrameTime = timestamp;
        drawFrame();
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrameId || reducedMotionQuery.matches || !isInView || !isPageVisible) {
        return;
      }

      lastFrameTime = 0;
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (!animationFrameId) return;
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";

      if (isPageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry?.isIntersecting ?? false;

        if (isInView) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 },
    );

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stopAnimation();
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        return;
      }

      drawFrame();
      startAnimation();
    };

    resizeCanvas();
    drawFrame();
    intersectionObserver.observe(section);
    startAnimation();

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      stopAnimation();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </section>
  );
}
