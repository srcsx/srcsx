import { MinusIcon } from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { Course as OriginCourse } from "@/generated/prisma/client";
import KidStarIcon from "@/assets/icons/KidStarIcon";
import StepsIcon from "@/assets/icons/StepsIcon";

type Course = OriginCourse & { oneCoursePerTerm: boolean };

export default function CourseButton({
  courseAction,
  passedAction,
  course,
  included,
  isPassed,
}: {
  courseAction: () => void;
  passedAction?: () => void;
  course: Course;
  included?: boolean;
  isPassed?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-between rounded-xl border bg-white px-4 py-4 text-sm shadow-sm dark:bg-black dark:bg-opacity-20 ${included ? "opacity-100" : "opacity-60"} ${isPassed ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:text-myBlack" : "border-transparent"}`}
    >
      <div className="flex items-center gap-2">
        {included ? (
          <button onClick={() => courseAction()} className="text-red-600">
            <MinusIcon />
          </button>
        ) : (
          <button onClick={() => courseAction()} className="text-blue-600">
            <PlusIcon />
          </button>
        )}

        <div className="w-[85%] overflow-clip md:w-auto">{course.name}</div>
      </div>
      <button
        onClick={() => (passedAction ? passedAction() : null)}
        className={`h-5 w-5 rounded-lg border ${isPassed ? "border-green-500 bg-green-500" : "border-gray-200"}`}
      ></button>

      <div
        className={`absolute -top-[9px] right-1 flex items-center justify-center text-myBlack transition-all dark:text-gray-200`}
      >
        {course.oneCoursePerTerm && <StepsIcon />}

        {course.required === true && <KidStarIcon />}
      </div>
    </div>
  );
}
