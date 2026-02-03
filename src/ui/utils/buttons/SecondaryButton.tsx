export default function SecondaryButton({
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
      className={`flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-light text-myBlack opacity-70 hover:opacity-100 disabled:opacity-40 dark:text-gray-200 md:text-base ${
        iconPosition === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {children}
      {icon && icon}
    </button>
  );
}
