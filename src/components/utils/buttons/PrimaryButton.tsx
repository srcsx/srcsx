export default function PrimaryButton({
  onClick,
  children,
  disabled = false,
  icon,
  iconPosition = "left",
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex w-full items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-xs text-myBlack transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8 md:text-base ${
        iconPosition === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {children}
      {icon && icon}
    </button>
  );
}
