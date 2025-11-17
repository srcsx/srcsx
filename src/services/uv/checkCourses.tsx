import { Course, CourseGroup } from "@prisma/client";

interface FinalResultGroup {
  name: string;
  type?: string;
  passeed_units: number;
  passed_courses_count: number;
  remaining_units: number;
  remaining_courses: Course[];
}

interface FinalResult {
  passed_units: number;
  passed_courses_count: number;
  data: FinalResultGroup[];
}

export function checkCourses(
  courseGroups: ({
    courses: Course[];
  } & CourseGroup)[],
  passedIds: Set<number>,
) {
  // Declare final variable.
  const finalResult: FinalResult = {
    passed_units: 0,
    passed_courses_count: 0,
    data: [],
  };

  // Check courses.
  let extraOptionalPassedCourses: Course[] = [];
  const extraOptionalNotPassedCourses: Course[] = [];

  for (const mainGroup of courseGroups) {
    let passedUnits = 0;
    let passedCoursesCount = 0;
    const passedCourses: typeof mainGroup.courses = [];

    const remainingCourses: Course[] = [];

    /**
     *  REQUIRED TYPE
     *  The required type in a group means EVERY course MUST BE PASSED.
     *  */
    if (mainGroup.type === "required") {
      for (const c of mainGroup.courses) {
        if (!passedIds.has(c.id)) {
          remainingCourses.push(c);
        } else {
          passedCourses.push(c);
          passedUnits += c.unit;
          passedCoursesCount += 1;
        }
      }
    }

    /**
     *  OPTIONAL TYPE
     *  The optional type in a group means that, based on the group's limitations, some courses must be passed.
     *  */
    if (mainGroup.type === "optional") {
      for (const c of mainGroup.courses) {
        if (passedIds.has(c.id)) {
          passedCourses.push(c);
          passedUnits += c.unit;
          passedCoursesCount++;
        } else if (mainGroup.syllabusId !== null) {
          extraOptionalNotPassedCourses.push(c);
        }
      }

      const enoughCourses =
        passedCoursesCount >= (mainGroup.minRequiredCourses || 0);
      const enoughUnits = passedUnits >= mainGroup.minRequiredUnits;

      if (!mainGroup.syllabusId && (!enoughCourses || !enoughUnits)) {
        for (const c of mainGroup.courses) {
          if (!passedIds.has(c.id)) {
            remainingCourses.push(c);
          }
        }
      }

      if (mainGroup.syllabusId && enoughCourses && enoughUnits) {
        const minCourses = mainGroup.minRequiredCourses || 0;
        const minUnits = mainGroup.minRequiredUnits || 0;

        let accumulatedUnits = 0;
        const requiredCourses: typeof mainGroup.courses = [];
        const extraCourses: typeof mainGroup.courses = [];

        for (const c of passedCourses) {
          if (
            requiredCourses.length < minCourses ||
            accumulatedUnits < minUnits
          ) {
            requiredCourses.push(c);
            accumulatedUnits += c.unit;
          } else {
            passedUnits -= c.unit;
            passedCoursesCount--;
            extraCourses.push(c);
          }
        }

        if (mainGroup.syllabusId !== null) {
          extraOptionalPassedCourses.push(...extraCourses);
        }
      }
    }

    /**
     *  ELECTIVE TYPE
     *  The elective type in a group means that, based on the group's limitations, some courses must be passed, which can include courses from previous optional groups.
     *  */
    if (mainGroup.type === "elective") {
      for (const c of mainGroup.courses) {
        if (passedIds.has(c.id)) {
          passedCourses.push(c);
          passedUnits += c.unit;
          passedCoursesCount++;
        } else {
          remainingCourses.push(c);
        }
      }

      for (const c of extraOptionalPassedCourses) {
        if (passedIds.has(c.id)) {
          passedUnits += c.unit;
          passedCoursesCount++;

          extraOptionalPassedCourses = extraOptionalPassedCourses.slice(1);
        } else {
          remainingCourses.push(c);
        }
      }
    }

    finalResult.passed_units += passedUnits;
    finalResult.passed_courses_count += passedCoursesCount;

    if (remainingCourses.length > 0) {
      const requiredRemainingUnits = remainingCourses
        .filter((c) => c.required)
        .reduce((sum, c) => sum + c.unit, 0);

      if (
        requiredRemainingUnits > 0 ||
        mainGroup.minRequiredUnits > passedUnits
      ) {
        let coursesToShow: typeof remainingCourses = [];

        if (
          requiredRemainingUnits >=
          mainGroup.minRequiredUnits - passedUnits
        ) {
          coursesToShow = remainingCourses.filter((c) => c.required);
        } else if (remainingCourses.every((c) => c.required)) {
          coursesToShow = remainingCourses;
        } else {
          coursesToShow = remainingCourses;
        }

        coursesToShow.sort(
          (a, b) => (b.required ? 1 : 0) - (a.required ? 1 : 0),
        );

        finalResult.data.push({
          name: mainGroup.name,
          type: mainGroup.type,
          remaining_units: mainGroup.minRequiredUnits - passedUnits,
          passeed_units: passedUnits,
          passed_courses_count: passedCoursesCount,
          remaining_courses: coursesToShow,
        });
      }
    }
  }

  return finalResult;
}
