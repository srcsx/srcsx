import prisma from "@/utils/prisma";

export default async function getOfferedCourses(majorId: number, term: number) {
  return await prisma.offeredCourse.findMany({
    where: {
      majorId,
      term,
    },
  });
}
