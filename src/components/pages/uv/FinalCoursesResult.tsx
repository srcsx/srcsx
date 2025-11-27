import KidStarIcon from "@/assets/icons/KidStarIcon";
import { Course } from "@/generated/prisma/client";

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
        <div className="mb-8">
          <h3 className="mb-4 font-bold dark:text-gray-200">تخصصی ها</h3>
          {final?.data?.map((group, index) => (
            <div key={index} className="mb-4">
              <div className="mb-2 border-r border-myBlack pb-1 pr-2 font-light dark:border-gray-200 dark:text-gray-200">
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
                    className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 opacity-50 dark:border-gray-200 dark:text-gray-200 md:px-6`}
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}
