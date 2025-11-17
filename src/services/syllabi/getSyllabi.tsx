import prisma from "@/utils/prisma";

export default async function getSyllabi() {
  return await prisma.syllabus.findMany();
}
