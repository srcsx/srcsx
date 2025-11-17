import prisma from "@/utils/prisma";

export const getFiles = async (majorId: number, year: number) => {
  return prisma.file.findMany({
    where: {
      OR: [
        {
          syllabus: {
            majorId: majorId,
            minEntryYear: { lte: year },
            maxEntryYear: { gte: year },
          },
        },
        { syllabusId: null },
      ],
    },
  });
};
