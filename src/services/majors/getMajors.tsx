import { DegreeLevel } from "@/generated/prisma/enums";
import prisma from "@/utils/prisma";

export default async function getMajors(
  type: DegreeLevel,
  universityId: number,
) {
  return await prisma.major.findMany({
    where: {
      type,
      universityId,
    },
  });
}
