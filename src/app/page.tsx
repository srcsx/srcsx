"use client";
import SetupVector from "@/assets/vectors/SetupVector";
import ItemLink from "@/components/pages/home/ItemLink";
import Loader from "@/components/pages/home/Loader";
import { motion } from "framer-motion";
import HomeLogo from "@/components/pages/home/HomeLogo";
import { useEffect, useState } from "react";
import Link from "next/link";
import { QuestionVector } from "@/assets/vectors/QuestionVector";
import { features } from "@/utils/features";
import { DriveStep } from "driver.js";
import { useTour } from "@/hooks/useTour";

const tourSteps: DriveStep[] = [
  {
    popover: {
      title: "خوش اومدی",
      description:
        "اگه اولین باره که اینجا رو باز می‌کنی بیا تا قدم به قدم تمام امکانات SRCSX رو با هم مرور کنیم.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#settings",
    popover: {
      title: "تنظیمات",
      description:
        "از طریق تنظیمات میتونی رشته و سال ورودت رو انتخاب کنی و همجنین یسری قابلیت های سایت رو تغییر بدی.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#about-srcsx",
    popover: {
      title: "درباره SRCSX",
      description:
        "میتونی از اینجا بیشتر درباره SRCSX بخونی، همچنین از طریق گیت‌هاب به پروژه دسترسی پیدا کنی.",
      side: "left",
      align: "start",
    },
  },
  ...(features.map((i) => {
    return {
      element: "#main-item-" + i.href,
      popover: {
        title: i.title,
        description: i.description ?? "متن تست.",
        side: "left",
        align: "start",
      },
    };
  }) as DriveStep[]),
  {
    element: "#guide",
    popover: {
      title: "راهنمایی",
      description:
        "اگه یادت رفت هر کدوم چی کار میکنه دوباره میتونی برگردی اینجا و این راهنما رو صدا کنی :)",
      side: "left",
      align: "start",
    },
  },
];

export default function HomePage() {
  const { restartTour } = useTour("home", tourSteps);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasSeenLoader = localStorage.getItem("hasSeenLoader");

    if (!hasSeenLoader) {
      setShowLoader(true);
      localStorage.setItem("hasSeenLoader", "true");
    }
  }, []);

  const calculateAnimationDelay = (i: number) => {
    return i * 0.2;
  };

  return (
    <div>
      {showLoader && (
        <>
          <Loader />
          <HomeLogo classes="opacity-10" />
        </>
      )}

      {!showLoader && (
        <>
          <HomeLogo />
        </>
      )}

      <div>
        <div className="mx-auto mb-2 grid max-w-[1024px] auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: calculateAnimationDelay(i + 1),
              }}
            >
              <ItemLink
                title={item.title}
                href={item.href}
                icon={item.icon}
                inProgress={item.inProgress}
                beta={item.beta}
                newItem={item.newItem}
                soon={item.soon}
                disabled={item.disabled}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-3 flex flex-col gap-1">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: calculateAnimationDelay(5),
          }}
        >
          <Link
            id="about-srcsx"
            href="/about-srcsx"
            className="flex items-center gap-2 rounded-r-full bg-myMain bg-opacity-5 px-3 py-2 pr-4 text-sm font-light text-myBlack text-opacity-70 transition-all hover:bg-opacity-10 hover:text-opacity-100 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:gap-4 md:text-xl"
          >
            <img
              src="/icon.svg"
              alt="srcsx icon"
              className="w-[18px] md:h-[28px] md:w-[28px]"
              fetchPriority="high"
            />
            معرفی
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: calculateAnimationDelay(5),
          }}
        >
          <button
            onClick={() => {
              restartTour();
            }}
            id="guide"
            className="flex items-center gap-2 rounded-r-full bg-myMain bg-opacity-5 px-3 py-2 pr-4 text-sm font-light text-myBlack text-opacity-70 transition-all hover:bg-opacity-10 hover:text-opacity-100 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:gap-4 md:text-xl"
          >
            <QuestionVector
              width="18"
              height="18"
              className="md:h-[28px] md:w-[28px]"
            />
            راهنما
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute right-0 top-[30px]"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: calculateAnimationDelay(5),
        }}
      >
        <Link
          id="settings"
          href="/setup"
          className="flex items-center gap-2 rounded-l-full bg-myMain bg-opacity-5 px-3 py-3 pr-4 text-sm font-light text-myBlack text-opacity-70 transition-all hover:bg-opacity-10 hover:text-opacity-100 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:gap-4 md:text-xl"
        >
          تنظیمات
          <SetupVector
            width="18"
            height="18"
            className="md:h-[28px] md:w-[28px]"
          />
        </Link>
      </motion.div>
    </div>
  );
}
