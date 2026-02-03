"use client";

import KidStarIcon from "@/assets/icons/KidStarIcon";
import StepsIcon from "@/assets/icons/StepsIcon";

export default function UVMainGuideBox() {
  return (
    <div>
      <p className="mb-2">
        درس‌هایی که تا به حال پاس کرده‌اید را انتخاب کنید. می‌توانید از جستجوی
        درس استفاده کنید یا با اسکرول بین دسته‌ها درس موردنظر را پیدا کنید.
      </p>

      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className="rounded-md bg-gray-200 px-1 text-[12px] text-gray-600 dark:bg-gray-700 dark:text-gray-200">
            x
          </span>
          <span>عدد انتهای نام هر درس، تعداد واحد آن است.</span>
        </li>

        <li className="flex items-center gap-2">
          <KidStarIcon className="inline-block" />
          <span>این درس‌ها الزامی هستند و باید پاس شوند.</span>
        </li>

        <li className="flex items-center gap-2">
          <StepsIcon className="inline-block" />
          <span>در هر ترم فقط یکی از این درس‌ها قابل انتخاب است.</span>
        </li>
      </ul>
    </div>
  );
}
