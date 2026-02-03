import KidStarIcon from "@/assets/icons/KidStarIcon";
import { Course } from "@/generated/prisma/client";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";

interface ResultObject {
  name: string;
  remaining_courses: Course[];
  required_courses: Course[];
  remaining_units: number;
  type: string;
}

interface ResultFinal {
  data: ResultObject[];
}

export default function FinalCoursesResult({ final }: { final: ResultFinal }) {
  return (
    <>
      {final?.data.length > 0 && (
        <div className="mb-8 space-y-4">
          {final?.data?.map((group, index) => (
            <AnimatedDiv
              key={index}
              className="border-t border-gray-50 pt-4 text-right font-medium text-myBlack dark:border-gray-200 dark:border-white/5 dark:from-white dark:to-gray-200 dark:text-gray-200"
            >
              <div className="mb-4 flex items-start justify-between gap-1">
                <h2 className="w-2/3">
                  {group.name}
                  <div className="mt-1 flex gap-1">
                    <div className="h-2 w-4 bg-myMain dark:bg-purple-200"></div>
                    <div className="h-2 w-2 bg-myMain/80 dark:bg-purple-200/80"></div>
                  </div>
                </h2>

                <div className="rounded-xl bg-black/5 px-2 py-1 text-sm font-light text-myBlack/70 dark:bg-white/5 dark:text-gray-300 md:text-sm">
                  <span className="font-medium text-myBlack dark:text-gray-100">
                    {group.remaining_units} واحد
                  </span>
                </div>
              </div>

              <div className="mb-4 font-light">
                {group.type == "required" && "تمام درس های زیر رو باید پاس کنی"}

                {group.type == "optional" &&
                  `باید به اندازه ${group.remaining_units} واحد از درس های زیر پاس کنی`}

                {group.type == "elective" &&
                  group.remaining_units > 0 &&
                  `حداقل باید به اندازه ${group.remaining_units} واحد از درس های زیر پاس کنی`}

                {group.type == "elective" &&
                  group.remaining_units <= 0 &&
                  `تمام درس های زیر رو باید پاس کنی`}
              </div>

              <div className="flex flex-wrap gap-2">
                {group.remaining_courses?.map((course, i) => (
                  <div
                    key={i}
                    className={`relative flex items-center justify-center rounded-2xl border border-myBlack border-opacity-30 px-2 py-2 text-sm font-light dark:border-gray-200/10 dark:text-gray-200 md:px-4 md:text-base`}
                  >
                    <span className="text-xs md:text-base">{course.name}</span>

                    <span className="mr-2 rounded-md bg-gray-200 px-1 align-middle text-xs text-gray-600">
                      {course.unit}
                    </span>

                    <div
                      className={`absolute -top-[9px] left-1 flex items-center justify-center transition-all`}
                    >
                      {course.required && <KidStarIcon />}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedDiv>
          ))}
        </div>
      )}
    </>
  );
}
