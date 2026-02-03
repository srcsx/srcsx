import CursorIcon from "@/assets/icons/CursorIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import CourseButton from "./CourseButton";
import { Course, CourseGroup } from "@/generated/prisma/client";
import { useState } from "react";
import { QuestionMarkIcon } from "@/assets/icons/QuestionMarkIcon";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";

export default function CoursesGroupSelectBox({
  group,
  selectedCourses,
  setSelectedCourses,
}: {
  group: CourseGroup & { courses: Course[] };
  selectedCourses: number[];
  setSelectedCourses: (
    course: Course | Course[] | null,
    remove?: boolean,
  ) => void;
}) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="border-t border-gray-50 pt-4 dark:border-white/5">
      <AnimatedDiv className="mb-4 flex items-start justify-between gap-x-2">
        <div className="flex w-3/5 items-center gap-2">
          {group.description && (
            <button
              onClick={() => setShowHint((p) => !p)}
              className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-gray-50 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
            >
              <QuestionMarkIcon />
            </button>
          )}

          <h2
            title={group.name}
            className="w-2/3 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text pb-1 pt-1 text-right font-medium text-myBlack text-transparent dark:border-gray-200 dark:from-white dark:to-gray-200 dark:text-gray-200"
          >
            {group.name}

            <div className="mt-1 flex gap-1">
              <div className="h-2 w-4 bg-myMain dark:bg-purple-200"></div>
              <div className="h-2 w-2 bg-myMain/80 dark:bg-purple-200/80"></div>
            </div>
          </h2>
        </div>

        <div className="flex flex-col items-end gap-2 md:flex-row-reverse md:items-center md:gap-4">
          <div className="ml-1 text-xs font-light text-myBlack/70 dark:text-gray-300 md:text-sm">
            <span className="font-medium text-myBlack dark:text-gray-100">
              {group.courses.reduce(
                (acc, c) =>
                  selectedCourses.includes(c.id) ? acc + c.unit : acc,
                0,
              )}
            </span>
            <span className="mx-1 opacity-60">/</span>
            {group.minRequiredUnits} واحد
          </div>

          <button
            onClick={() => {
              const allSelected =
                group.courses.filter((c) => selectedCourses.includes(c.id))
                  .length === group.courses.length;

              setSelectedCourses(group.courses, allSelected);
            }}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all md:text-sm ${
              group.courses.filter((c) => selectedCourses.includes(c.id))
                .length === group.courses.length
                ? "border-red-300/40 text-red-600 hover:bg-red-50 dark:border-red-400/30 dark:text-red-400 dark:hover:bg-red-500/10"
                : "border-gray-300/40 text-gray-600 hover:bg-gray-100 dark:border-gray-500/30 dark:text-gray-300 dark:hover:bg-gray-700/30"
            } `}
          >
            {group.courses.filter((c) => selectedCourses.includes(c.id))
              .length === group.courses.length ? (
              <>
                <TrashIcon width={16} height={16} />
                <span>حذف همه</span>
              </>
            ) : (
              <>
                <CursorIcon width={16} height={16} />
                <span>انتخاب همه</span>
              </>
            )}
          </button>
        </div>
      </AnimatedDiv>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="-mx-4 mb-4 bg-gray-50 px-6 py-4 text-xs font-light leading-5 text-gray-600 dark:bg-black dark:bg-opacity-20 dark:text-gray-300 md:text-sm"
          >
            {group.description}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        {group.courses?.map((course, i) => (
          <CourseButton
            key={i}
            onClick={setSelectedCourses}
            course={course}
            isSelected={selectedCourses.includes(course.id)}
            required={group.type === "required"}
            oneCoursePerTerm={group.oneCoursePerTerm}
          />
        ))}
      </div>
    </div>
  );
}
