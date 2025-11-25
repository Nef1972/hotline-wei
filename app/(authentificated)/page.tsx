"use client";

import { useAppContext } from "@/lib/contexts/AppContext";
import { useEffect, useRef } from "react";
import { createSnowAnimation } from "@/lib/utils/AnimationUtils";

export default function HomePage() {
  const { people } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = createSnowAnimation(canvas);
    if (!handleResize) return;

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[90vh] sm:h-[93vh] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="text-4xl sm:text-5xl font-bold dark:text-white text-black drop-shadow-md">
          Bienvenue, {people?.firstName} {people?.lastName}
        </div>

        <div className="mt-10 w-full max-w-2xl">
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/30">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
