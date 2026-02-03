import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollableSelectBox({
  items,
  selectedItem,
  onChange,
}: {
  items: { value: string | number; label: string }[];
  selectedItem?: string | number | null;
  onChange: (n: { value: string | number; label: string }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      selectedRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }, [selectedItem]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        opacity: 1,
        height: "100%",
      }}
      exit={{
        opacity: 0,
        height: 0,
      }}
      transition={{
        height: { duration: 0.5, ease: "easeOut" },
        opacity: { delay: 0.1, duration: 0.5 },
      }}
    >
      <div className="w-full rounded-3xl px-2 text-sm font-medium">
        <div
          className="flex items-center gap-1 overflow-scroll"
          ref={containerRef}
          style={{
            scrollSnapType: "x mandatory",
            scrollSnapAlign: "center",
          }}
        >
          {items.map((item) => (
            <button
              key={item.value}
              ref={selectedItem === item.value ? selectedRef : null}
              onClick={() => onChange(item)}
              className={`relative flex items-center justify-center rounded-2xl border border-myBlack border-opacity-30 px-2 py-2 text-sm font-light dark:border-gray-200/10 dark:text-gray-200 md:px-4 md:text-base ${
                item.value === selectedItem
                  ? "border-[#0E465E]/10 bg-gradient-to-r from-myBlack/5 to-[#0E465E]/5 text-myBlack opacity-100 dark:from-white/10 dark:to-gray-200/10"
                  : "opacity-50"
              }`}
            >
              <div
                className={`ml-[6px] h-3 w-3 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
                  item.value === selectedItem
                    ? "bg-gradient-to-bl from-myMain/80 to-myBlack/80 dark:from-white/80 dark:to-gray-200/80"
                    : ""
                }`}
              ></div>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
