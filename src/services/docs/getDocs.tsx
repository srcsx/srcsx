import prisma from "@/utils/prisma";

export const getDocs = async () => {
  return await prisma.doc.findMany({
    include: {
      sections: true,
    },
  });
};
