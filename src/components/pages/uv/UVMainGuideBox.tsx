import KidStarIcon from "@/assets/icons/KidStarIcon";
import StepsIcon from "@/assets/icons/StepsIcon";

export default function UVMainGuideBox() {
  return (
    <div className="-mx-4 mb-8 bg-gray-100 px-6 py-4 text-sm font-light leading-6 text-gray-600 dark:bg-black dark:bg-opacity-20 dark:text-gray-300 md:text-base">
      <div className="mb-2 font-bold">راهنما:</div>
      <div className="mb-4">
        درس هایی که تا به حال پاس کردید را انتخاب کنید، میتوانید از جستجو درس
        اقدام کنید و یا با اسکرول بین دسته ها درس را ییدا کنید.
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
      <div>
        - درس هایی که با <StepsIcon className="inline-block" /> نشانه گذاری شده
        اند، باید در هر ترم نهایت یکی از بین آن ها را انتخاب کنید.
      </div>
    </div>
  );
}
