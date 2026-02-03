import AnimatedDiv from "@/ui/layout/AnimatedDiv";

export default function ToggleButton({
  onClick,
  isSelected,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatedDiv
      className={`relative flex items-center justify-center gap-2 rounded-2xl border border-myBlack border-opacity-30 px-3 py-2 text-xs opacity-50 dark:border-white/10 dark:text-gray-200 md:px-6`}
    >
      <button
        onClick={onClick}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${isSelected ? "bg-myMain dark:bg-gray-300" : "bg-gray-600 opacity-40 dark:opacity-60"} `}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isSelected ? "-translate-x-[22px]" : "-translate-x-[2px]"} `}
        />
      </button>

      {children}
    </AnimatedDiv>
  );
}
