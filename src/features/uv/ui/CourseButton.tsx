import React from "react";
import StepsIcon from "@/assets/icons/StepsIcon";
import KidStarIcon from "@/assets/icons/KidStarIcon";
import { Course } from "@/generated/prisma/client";
import { motion } from "framer-motion";

export default function CourseButton({
  onClick,
  course,
  isSelected,
  disabled,
  required,
  oneCoursePerTerm,
}: {
  onClick: (couese: Course | null) => void;
  course: Course;
  isSelected?: boolean;
  disabled?: boolean;
  required?: boolean;
  oneCoursePerTerm?: boolean;
}) {
  return (
    <motion.button
      disabled={disabled}
      onClick={() => {
        onClick(course);
      }}
      initial={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      animate={{
        opacity: isSelected ? 1 : 0.5,
        y: 0,
      }}
      className={`relative flex items-center justify-center rounded-2xl border border-myBlack border-opacity-30 px-2 py-2 text-sm font-light dark:border-gray-200/10 dark:text-gray-200 md:px-4 md:text-base ${
        isSelected
          ? "border-[#0E465E]/5 bg-gradient-to-r from-myBlack/5 to-[#0E465E]/5 text-myBlack opacity-100 dark:from-white/10 dark:to-gray-200/10"
          : ""
      }`}
    >
      <motion.div
        className={`ml-[6px] h-3 w-3 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
          isSelected
            ? "bg-gradient-to-bl from-myMain/90 to-myBlack/90 dark:from-white/80 dark:to-gray-200/80"
            : ""
        }`}
      ></motion.div>

      <span className="text-xs md:text-base">{course.name}</span>

      <span className="mr-2 rounded-md bg-gray-200 px-1 align-middle text-xs text-gray-600">
        {course.unit}
      </span>

      <div
        className={`absolute -top-[9px] left-1 flex items-center justify-center text-myBlack transition-all dark:text-gray-200`}
      >
        {oneCoursePerTerm && <StepsIcon />}

        {(required || course.required === true) && <KidStarIcon />}
      </div>
    </motion.button>
  );
}
