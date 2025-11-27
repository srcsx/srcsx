import { Course, CourseRequisite } from "@/generated/prisma/client";

type RawCourse = Partial<Course> & {
  preCourseRequisites: CourseRequisite[];
  unitRequisiste?: number | null;
};

export function checkTermBased(courses: RawCourse[], input: number[][]) {
  const passedCourses: number[] = [];
  const issues: { term: number; message: string }[] = [];

  for (const [term_index, cs] of input.entries()) {
    cs.forEach((v) => {
      const c = courses.find((c) => c.id === v);

      if (!c) {
        return;
      }

      if (c.preCourseRequisites.length > 0) {
        const missingPrereqs = c.preCourseRequisites.filter(
          (c) => !passedCourses.includes(c.courseRequisiteId),
        );

        if (missingPrereqs.length > 0) {
          const missingNames = missingPrereqs
            .map(
              (c) => courses.find((cv) => cv.id === c.courseRequisiteId)?.name,
            )
            .filter(Boolean)
            .join("، ");

          issues.push({
            term: term_index + 1,
            message:
              "پیش‌نیازهای درس " +
              `"${c.name}"` +
              " شامل " +
              `"${missingNames}"` +
              " رو قبل از این ترم پاس نکرده بودی. (اگه یک بار افتاده باشی در ترم‌های گذشته مشکلی نداره)",
          });
        }
      }
    });

    passedCourses.push(...cs);
  }

  return { passedCourses, issues };
}
