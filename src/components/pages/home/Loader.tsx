"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HomeLogo from "./HomeLogo";

export default function Loader() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-10 h-full w-full bg-white dark:bg-myBlack"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: 0.5,
              duration: 2.0,
              ease: "easeOut",
            }}
            onLayoutAnimationComplete={() => setShowOverlay(false)}
            onAnimationComplete={() => setShowOverlay(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="z-50 text-4xl font-bold text-blue-600"
        initial={{
          y: "45vh",
          x: "-50%",
          left: "50%",
          position: "absolute",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
        animate={{
          y: "0px",
          x: "-50%",
          animation: "none",
        }}
        transition={{
          delay: 1,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <HomeLogo />
      </motion.div>
    </>
  );
}
