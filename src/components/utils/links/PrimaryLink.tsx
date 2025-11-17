import Link from "next/link";

export default function PrimaryLink({
  href,
  children,
  icon,
  iconPosition = "left",
  prefetch = true,
}: {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`darK:text-gray-200 relative flex w-full items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-sm text-myBlack transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8 md:text-base ${
        iconPosition === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {children}
      {icon && icon}
    </Link>
  );
}
