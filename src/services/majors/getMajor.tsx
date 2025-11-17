import prisma from "@/utils/prisma";

export default async function getMajor(majorSlug: string) {
  return await prisma.major.findFirst({
    where: {
      slug: majorSlug,
    },
  });
}
