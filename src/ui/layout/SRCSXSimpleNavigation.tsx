"use client";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { usePageActions } from "@/store/usePageActions";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DriveStep } from "driver.js";
import { useTour } from "@/hooks/useTour";
import SetupVector from "@/assets/vectors/SetupVector";
import { QuestionVector } from "@/assets/vectors/QuestionVector";
import Link from "next/link";
import { features } from "@/features/home/utils/features";

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

export default function SRCSXSimpleNav() {
  const { onBack, onNext, onNextText, onBackText } = usePageActions();

  const pathname = usePathname();
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

  const { restartTour } = useTour("home", tourSteps);

  const footerItems = [
    {
      id: "settings",
      title: "تنظیمات",
      onClick: undefined,
      href: "setup",
      icon: <SetupVector width={24} height={24} />,
      type: "link",
    },
    {
      id: "about-srcsx",
      title: "معرفی",
      onClick: undefined,
      href: "about-srcsx",
      icon: (
        <img
          src="/icon.svg"
          alt="srcsx icon"
          className="w-[24px]"
          fetchPriority="high"
        />
      ),
      type: "link",
    },
    {
      id: "guide",
      title: "راهنما",
      onClick: () => {
        restartTour();
      },
      href: undefined,
      icon: <QuestionVector width="24" height="24" />,
      type: "button",
    },
  ];

  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 flex justify-center gap-4">
      {pathname === "/" ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.9, 0.1, 0.9, 1] }}
          className="pointer-events-auto flex items-center gap-x-2 rounded-3xl border border-gray-200 bg-white/50 p-2 text-gray-500 shadow-sm backdrop-blur-3xl transition-all dark:border-black dark:bg-black/5 dark:text-gray-300"
        >
          <div className="flex items-center justify-center gap-4">
            {[...footerItems].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center justify-center"
              >
                {item.type === "button" ? (
                  <button
                    id={item.id}
                    onClick={item.onClick}
                    aria-label={item.title}
                    className="w-6 opacity-30 transition-all hover:opacity-80"
                  >
                    {item.icon}
                  </button>
                ) : (
                  <Link
                    id={item.id}
                    href={item.href!}
                    aria-label={item.title}
                    className="w-6 opacity-30 transition-all hover:opacity-80"
                  >
                    {item.icon}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={triggered}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.9, 0.1, 0.9, 1] }}
            className="pointer-events-auto flex items-center gap-x-2 rounded-3xl border border-gray-200 bg-white/50 p-2 text-gray-500 shadow-sm backdrop-blur-3xl transition-all dark:border-black dark:bg-black/5 dark:text-gray-300"
          >
            <button
              onClick={goBack}
              className="flex items-center gap-x-2 rounded-2xl px-6 py-3 font-light transition-all hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ArrowLeftIcon className="rotate-180" />
              {onBackText ?? "بازگشت"}
            </button>

            {onNext !== undefined && (
              <button
                onClick={goNext}
                className="relative flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-myMain/5 px-6 py-3 text-sm transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:hover:bg-opacity-40 md:text-base"
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
