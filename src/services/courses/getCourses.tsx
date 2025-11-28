import prisma from "@/utils/prisma";
import { getUserData } from "@/utils/userData";
import { CourseReference, CourseResource } from "@/generated/prisma/client";

export const getCoursesByGroups = async () => {
  const user = await getUserData();

  if (!user.majorId && !user.year) {
    return [];
  }

  const groups = await prisma.courseGroup.findMany({
    where: {
      OR: [
        {
          syllabus: {
            majorId: user.majorId,
            minEntryYear: { lte: user.year },
            maxEntryYear: { gte: user.year },
          },
        },
        {
          syllabusId: null,
          minEntryYear: { lte: user.year },
          maxEntryYear: { gte: user.year },
        },
      ],
    },
    include: {
      courses: {
        orderBy: { id: "asc" },
      },
    },
  });

  return groups;
};

export const getRawCourses = async (
  mainCourses: boolean = true,
  generalCourses: boolean = true,
  setRequired: boolean = true,
  setResources: boolean = false,
  setPreRequisite: boolean = false,
  setUnitPreRequisite: boolean = false,
) => {
  const user = await getUserData();

  if (!user.majorId && !user.year) {
    return [];
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const where: any = {
    courseGroups: {
      some: {},
    },
  };

  if (mainCourses && !generalCourses) {
    where.courseGroups.some = {
      syllabus: {
        majorId: user.majorId,
        minEntryYear: { lte: user.year },
        maxEntryYear: { gte: user.year },
      },
    };
  } else if (!mainCourses && generalCourses) {
    where.courseGroups.some = {
      syllabusId: null,
      OR: [
        {
          syllabus: {
            minEntryYear: { lte: user.year },
            maxEntryYear: { gte: user.year },
          },
        },
      ],
    };
  } else {
    where.courseGroups.some = {
      OR: [
        {
          syllabus: {
            majorId: user.majorId,
            minEntryYear: { lte: user.year },
            maxEntryYear: { gte: user.year },
          },
        },
        {
          syllabusId: null,
          minEntryYear: { lte: user.year },
          maxEntryYear: { gte: user.year },
        },
      ],
    };
  }

  const courses = await prisma.course.findMany({
    where,
    include: {
      termCoursesSyllabus: true,
      ...(setResources && {
        courseReference: {
          include: { resources: true },
        },
      }),
      ...(setRequired && { courseGroups: true }),
      ...(setPreRequisite && { preCourseRequisites: true }),
      ...(setUnitPreRequisite && {
        unitRequisites: {
          where: {
            syllabus: {
              majorId: user.majorId,
              minEntryYear: { lte: user.year },
              maxEntryYear: { gte: user.year },
            },
          },
        },
      }),
    },
    orderBy: {
      id: "asc",
    },
  });

  return courses.map((course: any) => ({
    ...course,

    defaultTerm: course.termCoursesSyllabus?.term ?? null,

    ...(setRequired && {
      required:
        course.courseGroups?.some((g: any) => g.type === "required") ?? false,
    }),

    ...(setResources && {
      resources:
        (
          course.courseReference as CourseReference & {
            resources: CourseResource[];
          }
        )?.resources ?? [],
    }),

    ...(setUnitPreRequisite && {
      unitRequisites:
        course.unitRequisites.length > 0 ? course.unitRequisites[0].unit : null,
    }),

    courseReference: undefined,
    courseGroups: undefined,
    termCoursesSyllabus: undefined,
    termCoursesSyllabusId: undefined,
  }));
};

export const getCoursesForFlowchart = async () => {
  const user = await getUserData();

  if (!user.majorId && !user.year) {
    return [];
  }

  const courses = await prisma.course.findMany({
    where: {
      courseGroups: {
        some: {
          syllabus: {
            majorId: user.majorId,
            minEntryYear: { lte: user.year },
            maxEntryYear: { gte: user.year },
          },
        },
      },
    },
    orderBy: { id: "asc" },
    include: {
      preCourseRequisites: true,
      unitRequisites: {
        where: {
          syllabus: {
            majorId: user.majorId,
            minEntryYear: { lte: user.year },
            maxEntryYear: { gte: user.year },
          },
        },
      },
    },
  });

  return courses.map((course: any) => ({
    ...course,
    unitRequisites:
      course.unitRequisites.length > 0 ? course.unitRequisites[0].unit : null,
  }));
};
