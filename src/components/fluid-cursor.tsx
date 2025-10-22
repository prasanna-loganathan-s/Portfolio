"use client";
import { useEffect, useState } from "react";

import fluidCursor from "@/hooks/useFluidCursor";

const FluidCursor = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on small screens and for users who prefer reduced motion
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < 1024; // < lg
    if (prefersReduced || isSmallScreen) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    fluidCursor();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};
export default FluidCursor;
