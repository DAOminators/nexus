'use client';
import { useEffect } from "react";

export default function Page() {
  // Load Locomotive Scroll
  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    ) ();
  }, []);
  return (
    <main>

    </main>
  )
} 