import Link from "next/link";

export default function ItemLink({
  title,
  href,
  icon,
  newItem,
  soon,
  beta,
  disabled,
  inProgress,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
  newItem?: boolean;
  soon?: boolean;
  beta?: boolean;
  disabled?: boolean;
  inProgress?: boolean;
}) {
  return (
    <Link
      id={"main-item-" + href}
      href={disabled ? "#" : "/" + href}
      prefetch={false}
      className={`relative flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-xs text-myBlack transition-all dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:min-h-[192px] md:p-8 md:text-base ${
        disabled ? "pointer-events-none opacity-50" : "hover:bg-opacity-10"
      }`}
    >
      {icon}
      <div
        className="max-w-[120px] select-none text-center md:max-w-[200px]"
        dangerouslySetInnerHTML={{ __html: title }}
      ></div>

      <div className="absolute -top-2 right-2 flex items-center gap-1">
        {newItem && (
          <div className="rounded-full bg-green-200 px-2 py-1 text-sm font-light text-green-700">
            جدید
          </div>
        )}

        {soon && (
          <div className="rounded-full bg-myMain px-2 py-1 text-sm font-light text-white shadow-md">
            بزودی
          </div>
        )}

        {beta && (
          <div className="rounded-full bg-[#BDCBD2] px-2 py-1 text-sm font-light text-myMain shadow-md dark:bg-gray-200">
            آزمایشی
          </div>
        )}

        {inProgress && (
          <div className="rounded-full bg-gradient-to-br from-violet-900 to-blue-900 px-2 py-1 text-sm font-light text-gray-200 shadow-md">
            در حال تکمیل
          </div>
        )}
      </div>
    </Link>
  );
}
