"use client";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { usePageActions } from "@/store/usePageActions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SRCSXSimpleNav() {
  const { onBack, onNext, onNextText, onBackText } = usePageActions();

  const pathname = usePathname();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const [counter, setCounter] = useState(0);

  const toggleTheme = () => {
    setCounter(counter + 1);

    if (counter !== 2) {
      return;
    }

    setCounter(0);
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark");
  };

  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };

  const [triggered, setTriggered] = useState(1);

  const goBack = () => {
    if (onBack) {
      onBack();
    } else {
      backToHome();
    }

    setTriggered(triggered + 1);
  };

  const goNext = () => {
    if (onNext) {
      onNext();
      setTriggered(triggered + 1);
    } else {
      return;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-4">
      {pathname === "/" ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.9, 0.1, 0.9, 1] }}
          className="rounded-t-xl bg-gray-100 dark:bg-[#1b1b1b]"
        >
          <button
            onClick={() => toggleTheme()}
            className="flex gap-x-2 px-6 py-2 font-light text-gray-300"
          >
            <img
              src="/logo.png"
              className="w-16 opacity-10 grayscale filter will-change-transform dark:brightness-0 dark:contrast-0"
              alt="srcsx"
              fetchPriority="high"
            />
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={triggered}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.9, 0.1, 0.9, 1] }}
            className="flex items-center gap-x-2 rounded-t-xl border border-gray-200 bg-gray-100 p-2 text-gray-500 transition-all dark:border-black dark:bg-[#1b1b1b] dark:text-gray-300"
          >
            <button
              onClick={goBack}
              className="flex items-center gap-x-2 rounded-2xl px-6 py-3 font-light transition-all hover:bg-black hover:bg-opacity-10"
            >
              <ArrowLeftIcon className="rotate-180" />
              {onBackText ?? "بازگشت"}
            </button>

            {onNext !== undefined && (
              <button
                onClick={goNext}
                className="relative flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-5 px-6 py-3 text-sm transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:hover:bg-opacity-40 md:text-base"
              >
                {onNextText ?? "ادامه"}
                <ArrowLeftIcon />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
