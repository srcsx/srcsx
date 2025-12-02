import prisma from "@/utils/prisma";

export default async function getUniversities() {
  return await prisma.university.findMany({
    orderBy: {
      id: "asc",
    },
    take: 10,
  });
}
