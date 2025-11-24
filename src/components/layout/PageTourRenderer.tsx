"use client";
import { useEffect, useRef } from "react";
import { Driver, driver } from "driver.js";
import { useTourStore } from "@/store/useTourStore";
import { usePathname } from "next/navigation";
import "driver.js/dist/driver.css";

export function PageTourRenderer() {
  const { steps, isOpen, activeTour } = useTourStore();
  const tourRef = useRef<Driver | null>(null);

  useEffect(() => {
    if (!isOpen || steps.length === 0) return;

    const { addSeenTour, clearTour } = useTourStore.getState();

    const t = driver({
      showProgress: true,
      steps,
      nextBtnText: "بعدی",
      prevBtnText: "قبلی",
      progressText: "{{current}} از {{total}}",
      doneBtnText: "اتمام",
      smoothScroll: true,
      onDestroyed: () => {
        if (activeTour) {
          addSeenTour(activeTour);
        }
        clearTour();
        tourRef.current = null;
      },
    });

    setTimeout(() => {
      t.drive();
    }, 100);

    tourRef.current = t;
  }, [isOpen, steps, activeTour]);

  const pathname = usePathname();

  useEffect(() => {
    tourRef.current?.destroy();
    tourRef.current = null;
  }, [pathname]);

  return null;
}
