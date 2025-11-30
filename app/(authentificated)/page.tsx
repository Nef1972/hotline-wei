"use client";

import { useAppContext } from "@/lib/contexts/AppContext";
import { useEffect, useRef } from "react";
import { createSnowAnimation } from "@/lib/utils/AnimationUtils";
import Image from "next/image";
import { useThemeContext } from "@/lib/contexts/ThemeContext";

export default function HomePage() {
  const { people } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { isDark } = useThemeContext();

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
        <div className="w-50 h-50 relative rounded-lg overflow-hidden">
          <Image
            className="object-cover"
            src={
              isDark
                ? "/icons/weinter-is-coming-text-white.svg"
                : "/icons/weinter-is-coming-text.svg"
            }
            alt={"weinter-is-coming"}
            fill
          />
        </div>
        <div className="text-4xl sm:text-5xl font-bold dark:text-white text-black drop-shadow-md">
          Bienvenue, {people?.firstName} {people?.lastName}
        </div>

        <div className="mt-10 w-full max-w-2xl">
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/30">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0uM7vrIzHhg "
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
