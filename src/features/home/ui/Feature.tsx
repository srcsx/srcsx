import Link from "next/link";
import { motion } from "framer-motion";

export default function Feature({
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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Link
        id={"main-item-" + href}
        href={disabled ? "#" : "/" + href}
        prefetch={false}
        className={`relative flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-gray-50 p-6 text-xs text-myBlack transition-all dark:bg-white/5 dark:bg-opacity-20 dark:text-gray-200 md:min-h-[192px] md:p-8 md:text-base ${
          disabled
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100 dark:hover:bg-white/10"
        }`}
      >
        {icon}
        <div
          className="max-w-[120px] select-none text-center md:max-w-[200px]"
          dangerouslySetInnerHTML={{ __html: title }}
        ></div>

        <div className="absolute -top-2 right-2 flex items-center gap-1">
          {newItem && (
            <div className="rounded-full border border-dashed border-black/50 bg-black/5 px-2 py-[2px] text-xs font-light backdrop-blur-3xl dark:border-white/60 dark:bg-white/20 dark:text-white">
              جدید
            </div>
          )}

          {soon && (
            <div className="rounded-full border border-dashed border-black/50 bg-black/5 px-2 py-[2px] text-xs font-light backdrop-blur-3xl dark:border-white/60 dark:bg-white/20 dark:text-white">
              بزودی
            </div>
          )}

          {beta && (
            <div className="rounded-full border border-dashed border-black/50 bg-black/5 px-2 py-[2px] text-xs font-light backdrop-blur-3xl dark:border-white/60 dark:bg-white/20 dark:text-white">
              آزمایشی
            </div>
          )}

          {inProgress && (
            <div className="rounded-full border border-dashed border-black/50 bg-black/5 px-2 py-[2px] text-xs font-light backdrop-blur-3xl dark:border-white/60 dark:bg-white/20 dark:text-white">
              در حال تکمیل
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
