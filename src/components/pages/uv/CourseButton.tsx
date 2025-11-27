import React from "react";
import StepsIcon from "@/assets/icons/StepsIcon";
import KidStarIcon from "@/assets/icons/KidStarIcon";
import { Course } from "@/generated/prisma/client";

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
    <button
      disabled={disabled}
      onClick={() => {
        onClick(course);
      }}
      className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 dark:border-gray-200 dark:text-gray-200 md:px-6 ${
        isSelected
          ? "border-[#0E465E] border-opacity-50 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text text-transparent opacity-100 dark:border-gray-200 dark:from-white dark:to-gray-200"
          : "opacity-50"
      }`}
    >
      <div
        className={`ml-2 h-4 w-4 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
          isSelected
            ? "bg-gradient-to-bl from-myMain to-myBlack dark:from-white dark:to-gray-200"
            : ""
        }`}
      ></div>

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
    </button>
  );
}
