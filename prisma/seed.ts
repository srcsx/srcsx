/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileType, readAllJsonFiles } from "@/lib/dataReader";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

type LoadedDataType<T = any> = {
  path: string;
  type: FileType;
  data: T;
};

export async function main() {
  const loadedData: LoadedDataType[] = readAllJsonFiles(
    process.env.JSON_DATA_PATH ?? "mock-data",
  );

  for (const file of loadedData) {
    if (file.type === "universities") {
      await prisma.university.createMany({
        data: file.data,
      });
    }

    if (file.type === "majors") {
      await prisma.major.createMany({ data: file.data });
    }

    if (file.type === "syllabi") {
      await prisma.syllabus.createMany({ data: file.data });
    }

    if (file.type === "docs") {
      for (const d of file.data) {
        const { sections, ...rest } = d;

        await prisma.doc.create({
          data: {
            ...rest,
            sections: {
              create: sections,
            },
          },
        });
      }
    }

    if (file.type === "refrence_courses") {
      await prisma.courseReference.createMany({
        data: file.data,
      });
    }

    if (file.type === "courses_resources") {
      await prisma.courseResource.createMany({
        data: file.data,
      });
    }

    if (file.type === "courses") {
      await prisma.course.createMany({
        data: file.data.map((c: any) => {
          const {
            prerequisite,
            corequisite,
            defaultTerm,
            unitPrerequisite,
            ...rest
          } = c;

          return rest;
        }),
      });
    }

    if (file.type === "course_requisites") {
      await prisma.courseRequisite.createMany({
        data: file.data,
      });
    }

    if (file.type === "course_unit_requisites") {
      await prisma.courseUnitRequisite.createMany({
        data: file.data,
      });
    }

    if (file.type === "files") {
      await prisma.file.createMany({
        data: file.data,
      });
    }

    if (file.type === "terms_courses_syllabi") {
      for (const t of file.data) {
        const { courses, ...rest } = t;

        await prisma.termCoursesSyllabus.create({
          data: {
            ...rest,
            courses: {
              connect: courses.map((c: any) => ({ id: c })),
            },
          },
        });
      }
    }

    if (file.type === "course_groups") {
      for (const g of file.data) {
        const { courses, id, ...rest } = g;

        await prisma.courseGroup.create({
          data: {
            ...rest,
            courses: {
              connect: courses.map((id: number) => ({ id: id })),
            },
          },
        });
      }
    }
  }
}

main();
