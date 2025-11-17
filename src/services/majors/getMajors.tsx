import prisma from "@/utils/prisma";

export default async function getMajors() {
  return await prisma.major.findMany();
}
