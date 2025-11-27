import { Course, CourseRequisite } from "@/generated/prisma/client";

type RawCourse = Course & { preCourseRequisites: CourseRequisite[] };

type CourseNode = RawCourse & {
  childs: CourseNode[];
};

export const buildCourseTree = (courses: RawCourse[]): CourseNode[] => {
  const map = new Map<number, CourseNode>();

  for (const c of courses) {
    map.set(c.id, {
      ...c,
      childs: [],
    });
  }

  for (const course of map.values()) {
    for (const p of course.preCourseRequisites) {
      const parent = map.get(p.courseRequisiteId);

      if (parent) {
        parent.childs.push(course);
      }
    }
  }

  const roots = Array.from(map.values()).filter(
    (c) => c.preCourseRequisites.length === 0,
  );

  return roots;
};
