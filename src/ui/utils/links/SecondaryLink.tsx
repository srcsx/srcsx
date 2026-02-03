import Link from "next/link";

export default function SecondaryLink({
  href,
  children,
  icon,
  iconPosition = "left",
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-light text-myBlack opacity-70 hover:opacity-100 disabled:opacity-40 dark:text-gray-200 md:text-base ${
        iconPosition === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {children}
      {icon && icon}
    </Link>
  );
}
