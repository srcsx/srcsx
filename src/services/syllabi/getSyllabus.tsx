import prisma from "@/utils/prisma";

export default async function getSyllabus(majorId: number, year: string) {
  return await prisma.syllabus.findFirst({
    where: {
      majorId: majorId,
      minEntryYear: { lte: Number(year) },
      maxEntryYear: { gte: Number(year) },
    },
  });
}
