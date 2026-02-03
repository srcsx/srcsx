type badgeStyle = "major-1" | "major-2";

export default function SelectButton({
  onClick,
  isSelected,
  title,
  badgeStyle,
}: {
  onClick: () => void;
  isSelected: boolean;
  title: string;
  badgeStyle?: badgeStyle;
}) {
  return (
    <div className="relative">
      <button
        onClick={() => onClick()}
        className={`relative flex items-center justify-center rounded-2xl border border-myBlack border-opacity-30 px-2 py-2 text-sm font-light dark:border-gray-200/10 dark:text-gray-200 md:px-4 md:text-base ${
          isSelected
            ? "border-[#0E465E]/10 bg-gradient-to-r from-myBlack/5 to-[#0E465E]/5 text-myBlack opacity-100 dark:from-white/10 dark:to-gray-200/10"
            : "opacity-50"
        }`}
      >
        <div
          className={`ml-[6px] h-3 w-3 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
            isSelected
              ? "bg-gradient-to-bl from-myMain/80 to-myBlack/80 dark:from-white/80 dark:to-gray-200/80"
              : ""
          }`}
        ></div>
        {title}
      </button>

      {badgeStyle === "major-1" && (
        <span className="absolute -top-2 left-2 z-10 rounded-2xl bg-gray-200 px-2 py-[2px] text-[8px] text-black">
          سطح ۱
        </span>
      )}
      {badgeStyle === "major-2" && (
        <span className="absolute -top-2 left-2 z-10 rounded-2xl bg-blue-400 px-2 py-[2px] text-[8px] text-white">
          سطح 2
        </span>
      )}
    </div>
  );
}
