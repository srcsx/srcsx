import CursorIcon from "@/assets/icons/CursorIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import CourseButton from "./CourseButton";
import { Course, CourseGroup } from "@/generated/prisma/client";

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
  return (
    <div>
      <div className="mb-2 flex items-start justify-between gap-x-2">
        <div
          className="border-r border-myBlack pb-1 pr-2 dark:border-gray-200 dark:text-gray-200"
          title={group.name}
        >
          {group.name}
        </div>

        <div className="flex flex-col items-end gap-2 md:flex-row-reverse md:items-center">
          <button
            className={`flex items-center gap-x-2 rounded-lg px-2 py-2 text-xs font-light dark:font-bold md:text-sm ${
              group.courses.filter((c) => selectedCourses.includes(c.id))
                .length === group.courses.length
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
            onClick={() => {
              if (
                group.courses.filter((c) => selectedCourses.includes(c.id))
                  .length === group.courses.length
              ) {
                setSelectedCourses(group.courses, true);
                return;
              }

              setSelectedCourses(group.courses);
            }}
          >
            {group.courses.filter((c) => selectedCourses.includes(c.id))
              .length === group.courses.length ? (
              <>
                <TrashIcon width={18} height={18} />
                <span>حذف همه</span>
              </>
            ) : (
              <>
                <CursorIcon width={18} height={18} />
                <span>انتخاب همه</span>
              </>
            )}
          </button>
          <div className="text-xs font-light text-myBlack dark:text-gray-200 md:text-sm">
            {group.courses.reduce(
              (acc, c) => (selectedCourses.includes(c.id) ? acc + c.unit : acc),
              0,
            )}{" "}
            / {group.minRequiredUnits} واحد
          </div>
        </div>
      </div>

      {group.description && (
        <div className="-mx-4 mb-4 bg-gray-100 px-6 py-4 text-xs font-light leading-5 text-gray-600 dark:bg-black dark:bg-opacity-20 dark:text-gray-300 md:text-sm">
          {group.description}
        </div>
      )}
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
