import prisma from "@/utils/prisma";
import { getUserData } from "@/utils/userData";

export default async function getOfferedCourses(majorId: number, term: number) {
  const user = await getUserData();

  const offeredCourses = await prisma.offeredCourse.findMany({
    where: {
      majorId,
      term,
    },
    include: {
      course: {
        select: {
          id: true,
          name: true,
          preCourseRequisites: {
            include: {
              courseRequisite: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
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
      },
    },
  });

  return offeredCourses.map((oc) => ({
    ...oc,
    course: {
      id: oc?.course?.id,
      name: oc?.course?.name,
      preCourseRequisites: oc.course?.preCourseRequisites.map((req) => ({
        id: req.courseRequisite.id,
        name: req.courseRequisite.name,
        corequisite: req.corequisite,
      })),
      unitRequisites: oc.course?.unitRequisites,
    },
  }));
}
