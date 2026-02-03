"use client";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";
import PageHeading from "@/ui/layout/PageHeading";

export default function AboutPage() {
  return (
    <div>
      <PageHeading title="درباره SRCSX" />

      <AnimatedDiv>
        <div className="relative h-full rounded-2xl bg-gray-50 p-6 text-sm font-light text-myBlack transition-colors dark:bg-white/5 dark:text-gray-200 md:p-8">
          <div className="mb-10 text-justify leading-7">
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

          <div className="-mx-6 mb-10 border-r-2 border-myMain/40 bg-myBlack/5 px-6 py-3 text-sm leading-6 dark:border-myMain/30 dark:bg-black/40 md:-mx-8 md:px-8">
            <span className="font-medium">توجه:</span> این اپلیکیشن تلاش می‌کنه
            سرویس‌ها رو با کمترین خطا ارائه بده، اما به‌خاطر تغییرات احتمالی در
            قوانین آموزشی، ممکنه بعضی بخش‌ها گاهی دچار مشکل بشن.
          </div>

          <hr className="mb-8 border-myBlack/10 dark:border-white/10" />

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="opacity-70">گیتهاب</span>
              <a
                href="https://github.com/srcsx/srcsx"
                target="_blank"
                className="font-medium opacity-60 transition hover:underline hover:opacity-100"
              >
                github.com/srcsx/srcsx
              </a>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="opacity-70">تلگرام</span>
              <a
                href="https://t.me/srcsx"
                target="_blank"
                className="font-medium opacity-60 transition hover:underline hover:opacity-100"
              >
                t.me/srcsx
              </a>
            </div>
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
}
