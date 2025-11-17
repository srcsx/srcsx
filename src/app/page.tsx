"use client";
import SetupVector from "@/assets/vectors/SetupVector";
import UvVector from "@/assets/vectors/UvVector";
import ItemLink from "@/components/pages/home/ItemLink";
import Loader from "@/components/pages/home/Loader";
import { motion } from "framer-motion";
import NumbersVector from "@/assets/vectors/NumbersVector";
import { useEffect, useState } from "react";
import HomeLogo from "@/components/pages/home/HomeLogo";
import BookStarVector from "@/assets/vectors/‌BookStarVector";
import { FlowchartVector } from "@/assets/vectors/FlowchartVector";
import { DocumentVector } from "@/assets/vectors/DocumentVector";
import Link from "next/link";
import { OpenBookVector } from "@/assets/vectors/OpenBookVector";
import { RegistrationVector } from "@/assets/vectors/RegistrationVector";
import { LibraryVector } from "@/assets/vectors/LibraryVector";

interface ItemType {
  title: string;
  href: string;
  icon: React.ReactNode;
  inProgress?: boolean;
  beta?: boolean;
  newItem?: boolean;
  soon?: boolean;
  disabled?: boolean;
}

const items: ItemType[] = [
  {
    title: "بررسی واحدهای درسی <br /> (کلی)",
    href: "/uv",
    icon: <UvVector />,
  },
  {
    title: "بررسی واحدهای درسی <br /> (بر اساس ترم)",
    href: "/uv-term-based",
    icon: <UvVector />,
  },
  {
    title: "فلوچارت درسی",
    href: "/flowchart",
    icon: <FlowchartVector />,
  },
  {
    title: "دریافت سرفصل ها و چارت ها",
    href: "/files",
    icon: <BookStarVector />,
  },
  {
    title: "داکیومنت <br /> (راهنما و آموزش ها)",
    href: "/docs",
    icon: <DocumentVector />,
    inProgress: true,
  },
  {
    title: "دریافت کد درس ها",
    href: "/courses-codes",
    icon: <NumbersVector />,
    inProgress: true,
  },
  {
    title: "منابع درسی",
    href: "/courses-resources",
    icon: <OpenBookVector />,
    inProgress: true,
  },
  {
    title: "انتخاب واحد آزمایشی",
    href: "#",
    icon: <RegistrationVector />,
    soon: true,
    disabled: true,
  },
  {
    title: "منابع آموزشی",
    href: "#",
    icon: <LibraryVector />,
    soon: true,
    disabled: true,
  },
];

export default function HomePage() {
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

      {!showLoader && <HomeLogo />}

      <div>
        <div className="mx-auto mb-2 grid max-w-[1024px] auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
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

      <motion.div
        className="fixed left-0 top-[34px]"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: calculateAnimationDelay(5),
        }}
      >
        <Link
          href="/setup"
          className="flex items-center gap-2 rounded-r-full bg-myMain bg-opacity-5 px-3 py-3 pr-4 text-sm font-light text-myBlack text-opacity-70 transition-all hover:bg-opacity-10 hover:text-opacity-100 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:gap-4 md:text-xl"
        >
          <SetupVector
            width="18"
            height="18"
            className="md:h-[28px] md:w-[28px]"
          />
          تنظیمات
        </Link>
      </motion.div>

      <motion.div
        className="fixed right-0 top-[34px]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: calculateAnimationDelay(5),
        }}
      >
        <Link
          href="/about-srcsx"
          className="flex items-center gap-2 rounded-l-full bg-myMain bg-opacity-5 px-3 py-3 pl-4 text-sm font-light text-myBlack text-opacity-70 transition-all hover:bg-opacity-10 hover:text-opacity-100 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:gap-4 md:text-xl"
        >
          معرفی
          <img
            src="/icon.svg"
            alt="srcsx icon"
            className="w-[18px] md:h-[28px] md:w-[28px]"
            fetchPriority="high"
          />
        </Link>
      </motion.div>
    </div>
  );
}
