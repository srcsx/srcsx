import prisma from "@/utils/prisma";
import { getUserData } from "@/utils/userData";
import { Course } from "../type";

class GetCoursesBuilder {
  private majorCourses = false;
  private generalCourses = false;

  private setRequired = false;

  private setResources = false;
  private setPreRequisite = false;
  private setUnitPreRequisite = false;

  private setNormalizePreRquisiste = false;
  private setNormalizeUnitPreRquisiste = false;

  // --------------------------------
  addMajorCourses(): this {
    this.majorCourses = true;
    return this;
  }

  addGeneralCourses(): this {
    this.generalCourses = true;
    return this;
  }

  includeRequired(): this {
    this.setRequired = true;
    return this;
  }

  includeResources(): this {
    this.setResources = true;
    return this;
  }

  includePreRequisites(normalize: boolean = false): this {
    this.setPreRequisite = true;
    this.setNormalizePreRquisiste = normalize;
    return this;
  }

  includeUnitPreRequisites(normalize: boolean = false): this {
    this.setUnitPreRequisite = true;
    this.setNormalizeUnitPreRquisiste = normalize;
    return this;
  }

  // --------------------------------
  private async getUser() {
    const user = await getUserData();
    if (!user.majorId || !user.year) return null;
    return user;
  }

  private buildWhere(user: any) {
    const base = {
      minEntryYear: { lte: user.year },
      maxEntryYear: { gte: user.year },
    };

    if (this.majorCourses && !this.generalCourses) {
      return {
        courseGroups: {
          some: { syllabus: { majorId: user.majorId, ...base } },
        },
      };
    } else if (!this.majorCourses && this.generalCourses) {
      return { courseGroups: { some: { syllabusId: null, ...base } } };
    } else {
      return {
        courseGroups: {
          some: {
            OR: [
              { syllabus: { majorId: user.majorId, ...base } },
              { syllabusId: null, ...base },
            ],
          },
        },
      };
    }
  }

  // --------------------------------
  async get(): Promise<Course[]> {
    const user = await this.getUser();

    if (!user) return [];

    const where = this.buildWhere(user);

    const courses = await prisma.course.findMany({
      where,
      include: {
        termCoursesSyllabus: true,
        ...(this.setResources && {
          courseReference: { include: { resources: true } },
        }),
        ...(this.setRequired && { courseGroups: true }),
        ...(this.setPreRequisite && {
          preCourseRequisites: {
            include: {
              courseRequisite: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        }),
        ...(this.setUnitPreRequisite && {
          unitRequisites: {
            where: {
              syllabus: {
                majorId: user.majorId,
                minEntryYear: { lte: user.year },
                maxEntryYear: { gte: user.year },
              },
            },
          },
        }),
      },
      orderBy: { id: "asc" },
    });

    return courses.map((course: any) => ({
      id: course.id,
      name: course.name,
      unit: course.unit,
      theoUnit: course.theoUnit,
      pracUnit: course.pracUnit,
      amozeshyarCode: course.amozeshyarCode,
      defaultTerm: course.termCoursesSyllabus?.term ?? null,
      ...(this.setRequired && {
        required:
          course.courseGroups?.some((g: any) => g.type === "required") ?? false,
        oneCoursePerTerm:
          course.courseGroups?.some((g: any) => g.oneCoursePerTerm) ?? false,
      }),
      ...(this.setResources && {
        resources: (course.courseReference?.resources ?? []) as any[],
      }),
      ...(this.setUnitPreRequisite && {
        unitRequisites: this.setNormalizeUnitPreRquisiste
          ? (course.unitRequisites?.[0]?.unit ?? null)
          : course.unitRequisites?.[0],
      }),
      ...(this.setPreRequisite && {
        preCourseRequisites: this.setNormalizePreRquisiste
          ? course.preCourseRequisites?.map((req: any) => ({
              name: req.courseRequisite.name,
              corequisite: req.corequisite,
            }))
          : course.preCourseRequisites,
      }),
    }));
  }
}

// --------------------------------
export const getCourses = () => new GetCoursesBuilder();
