import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import KidStarIcon from "@/assets/icons/KidStarIcon";
import Link from "next/link";

export default function FlowchartMainGuideBox() {
  return (
    <div className="-mx-4 mb-8 bg-gray-100 px-6 py-4 text-sm font-light leading-6 text-gray-600 dark:bg-black dark:bg-opacity-20 dark:text-gray-300 md:text-base">
      <div className="mb-2 font-bold">راهنما:</div>
      <div className="mb-4 font-bold xl:hidden">
        - برای نمایش بهتر فلوچارت از یک دیوایس با صفحه نمایش بزرگتر استفاده
        کنید.
      </div>
      <div className="mb-4">
        - عدد داخل{" "}
        <span className="inline-block min-h-[20px] rounded-md bg-gray-200 px-1 align-middle text-[12px] font-normal text-gray-600">
          x
        </span>{" "}
        انتهای نام هر درس، تعداد واحد درس می باشد.
      </div>
      <div className="mb-4">
        - درس هایی که با <KidStarIcon className="inline-block" /> نشانه گذاری
        شده اند، الزامی بوده و باید حتما پاس شوند.
      </div>
      <div className="mb-4">
        - درس های عمومی و معارف در این فلوچارت حضور ندارند.
      </div>
      <div className="mb-4">
        - می‌توانید با استفاده از دکمه های فیلتر، بر اساس درس هایی که در{" "}
        <Link href={"/uv-term-based"} className="underline">
          بررسی واحد (بر اساس ترم)
        </Link>{" "}
        یا{" "}
        <Link href={"/uv"} className="underline">
          بررسی واحد
        </Link>{" "}
        انتخاب کردید، درس های پاس کرده خود را فیلتر کنید.
      </div>
      <div>
        - خط با پیکان <ArrowLeftIcon className="inline" /> به معنای پیشنیاز، و
        خط بدون پیکان به معنای همنیاز است.
      </div>
    </div>
  );
}
