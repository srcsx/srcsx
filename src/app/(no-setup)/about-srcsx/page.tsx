"use client";
import PageHeading from "@/components/layout/PageHeading";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div>
      <PageHeading title="درباره" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <div
          className={`relative h-full items-center justify-center gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-justify text-base font-light text-myBlack transition-all hover:bg-opacity-10 disabled:opacity-50 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8`}
        >
          <div className="mb-8">
            اپلیکیشن SRCSX یه پلتفرم مستقل، هوشمند و جامع برای دانشجوهاست که با
            هدف ساده‌تر و دقیق‌تر کردن مسیر تحصیلی طراحی شده. با SRCSX می‌تونی
            به‌راحتی چارت و فلوچارت درسی رشته‌ات رو ببینی، پیش‌نیاز و هم‌نیاز
            درس‌ها رو بررسی کنی، برنامه‌ریزی درسی انجام بدی و از تداخل یا
            اشتباهات آموزشی جلوگیری کنی. این اپ بهت کمک می‌کنه مسیر دانشگاهی‌ت
            رو شفاف‌تر ببینی و با دید بهتر برای ترم‌های بعد تصمیم بگیری.
          </div>

          <div className="-mx-6 mb-8 bg-myBlack bg-opacity-10 px-6 py-2 text-sm font-light text-myBlack dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:-mx-8 md:px-8">
            <span className="font-bold">توجه کنید،</span> این اپلیکیشن تلاش داره
            که با کمترین ایراد ممکن سرویس هارو ارائه بده، اما به دلیل تفییرات
            قوانین آموزشی ممکنه ایراداتی در برخی سیستم ها وجود داشته باشه.
          </div>

          <hr className="mb-8 opacity-80" />

          <div className="flex justify-between">
            <div>گیتهاب:</div>

            <div className="font-bold opacity-50">
              <a href="https://github.com/srcsx/srcsx" target="_blank">
                SRCSX
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
