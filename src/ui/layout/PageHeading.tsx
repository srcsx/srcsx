import { QuestionMarkIcon } from "@/assets/icons/QuestionMarkIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function PageHeading({
  title,
  guideBox,
}: {
  title: string;
  guideBox?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text pb-1 pt-1 text-right text-xl font-medium text-myBlack text-transparent dark:border-gray-200 dark:from-white dark:to-gray-200 dark:text-gray-200">
          <div className="mb-1 flex gap-1">
            <div className="h-2 w-4 bg-myMain dark:bg-purple-200"></div>
            <div className="h-2 w-2 bg-myMain/80 dark:bg-purple-200/80"></div>
          </div>
          {title}
        </h1>

        {guideBox && (
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
          >
            <QuestionMarkIcon />
          </button>
        )}
      </div>

      <AnimatePresence>
        {guideBox && open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="mb-4 mt-3 space-y-3 rounded-xl bg-gray-50 px-4 py-4 text-sm leading-6 text-gray-600 dark:bg-white/5 dark:text-gray-300"
          >
            {guideBox}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
