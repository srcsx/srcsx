"use client";
import SetupVector from "@/assets/vectors/SetupVector";
import ItemLink from "@/components/pages/home/ItemLink";
import Loader from "@/components/pages/home/Loader";
import { motion } from "framer-motion";
import HomeLogo from "@/components/pages/home/HomeLogo";
import { useEffect, useState } from "react";
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

      <div className="mx-auto max-w-[1024px]">
        <div className="mb-8 grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3">
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

        <div className="mb-8 h-1 w-full rounded-full bg-myMain bg-opacity-5 dark:bg-black dark:bg-opacity-20"></div>

        <div className="mb-2 grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: calculateAnimationDelay(9),
            }}
            id="settings"
          >
            <ItemLink
              title={"تنظیمات"}
              href={"setup"}
              icon={<SetupVector width={64} height={64} />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: calculateAnimationDelay(10),
            }}
            id="about-srcsx"
          >
            <ItemLink
              title={"معرفی"}
              href={"about-srcsx"}
              icon={
                <img
                  src="/icon.svg"
                  alt="srcsx icon"
                  className="w-[64px]"
                  fetchPriority="high"
                />
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: calculateAnimationDelay(11),
            }}
          >
            <button
              onClick={() => {
                restartTour();
              }}
              id="guide"
              className={`relative flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-xs text-myBlack transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:min-h-[192px] md:p-8 md:text-base`}
            >
              <QuestionVector width="64" height="64" />
              راهنما
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
