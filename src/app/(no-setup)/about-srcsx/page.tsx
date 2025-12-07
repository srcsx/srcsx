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
          className={`relative h-full items-center justify-center gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-justify text-sm font-light text-myBlack transition-all hover:bg-opacity-10 disabled:opacity-50 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8`}
        >
          <div className="mb-8">
            اپ SRCSX یه ابزار جمع‌وجوره برای دانشجوها که باهاش می‌تونی چارت و
            فلوچارت رشته‌تو ببینی، پیش‌نیازا رو چک کنی، برنامه‌ریزی درسی بچینی و
            جلوی تداخل‌ها رو بگیری. علاوه بر این، بخش‌های منابع و یادگیری هم
            داریم که می‌تونه کمکت کنه بهتر و راحت‌تر جلو بری.
            <br />
            <br />
            این پلتفرم به‌صورت مستقل توسط خود بچه‌ها توسعه داده می‌شه. اگه دوست
            داشتید روی کد همکاری کنید، می‌تونید توی گیت‌هاب PR بدید. اگه هم
            مشکلی، پیشنهادی یا مسئله‌ای بود، می‌تونید یه Issue باز کنید یا از
            طریق تلگرام خبر بدید. خوشحال می‌شیم کمک‌ کنید بهترش کنیم.
          </div>

          <div className="-mx-6 mb-8 bg-myBlack bg-opacity-5 px-6 py-2 text-sm font-light text-myBlack dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:-mx-8 md:px-8">
            <span className="font-bold">توجه کنید، </span>این اپلیکیشن تلاش
            می‌کنه سرویس‌ها رو با کمترین خطا ارائه بده، اما به‌خاطر تغییرات
            احتمالی در قوانین آموزشی، ممکنه بعضی بخش‌ها گاهی دچار مشکل بشن.
          </div>

          <hr className="mb-8 opacity-80" />

          <div className="mb-4 flex justify-between">
            <div>گیتهاب:</div>

            <div className="font-bold opacity-50">
              <a href="https://github.com/srcsx/srcsx" target="_blank">
                https://github.com/srcsx/srcsx
              </a>
            </div>
          </div>
          <div className="flex justify-between">
            <div>تلگرام:</div>

            <div className="font-bold opacity-50">
              <a href="https://t.me/srcsx" target="_blank">
                https://t.me/srcsx
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
