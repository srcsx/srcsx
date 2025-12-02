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
        className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 text-sm dark:border-gray-200 dark:text-gray-200 md:px-6 md:text-base ${
          isSelected
            ? "border-[#0E465E] border-opacity-50 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text text-transparent opacity-100 dark:from-white dark:to-gray-200"
            : "opacity-50"
        }`}
      >
        <div
          className={`ml-2 h-4 w-4 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
            isSelected
              ? "bg-gradient-to-bl from-myMain to-myBlack dark:from-white dark:to-gray-200"
              : ""
          }`}
        ></div>
        {title}
      </button>

      {badgeStyle === "major-1" && (
        <span className="absolute -top-3 left-2 z-10 rounded-2xl bg-gray-200 px-2 py-1 text-[8px] text-black">
          سطح ۱
        </span>
      )}
      {badgeStyle === "major-2" && (
        <span className="absolute -top-2 left-2 z-10 rounded-2xl bg-blue-400 px-2 py-1 text-[8px] text-white">
          سطح 2
        </span>
      )}
    </div>
  );
}
