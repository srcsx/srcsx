"use client";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import { Term } from "@/features/uv-term-based/types";
import CourseButton from "@/features/uv/ui/CourseButton";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Course as OriginCourse } from "@/generated/prisma/client";
import axiosInstance from "@/utils/connect";
import PrimaryInput from "@/ui/utils/inputs/PrimaryInput";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";

type Course = OriginCourse & { oneCoursePerTerm: boolean };

const generateTermName = (i: number, year: number) => {
  if (!year) return i;

  const r = i % 3;
  const d = i / 3;

  let modifiedYear = year;

  if (d % 1 !== 0 && i > 2) {
    modifiedYear = year + Math.floor(d);
  } else if (i > 2) {
    modifiedYear = year + d - 1;
  }

  return (
    (r !== 0 ? Math.ceil(i - d).toString() : "*") +
    " - " +
    "نیمسال " +
    modifiedYear.toString().substring(1) +
    (r === 0 ? "3" : r.toString()) +
    " " +
    (r === 0 ? "(تابستان)" : r === 1 ? "(مهر)" : "(بهمن)")
  );
};

const isTabestan = (i: number) => {
  return i % 3 === 0;
};

export default function SelectCourses({
  year,
  termsStore,
  setTermsStore,
  passedUnitsStore,
  setPassedUnitsStore,
  coursesStore,
  setCoursesStore,
}: {
  year: number;
  termsStore: Term[];
  setTermsStore: (terms: Term[]) => void;
  passedUnitsStore: number;
  setPassedUnitsStore: (units: number) => void;
  coursesStore: number[];
  setCoursesStore: (courses: number[]) => void;
}) {
  const [fetchCourses, setFetchCourses] =
    useState<(Course & { defaultTerm: number })[]>();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setSearchData([]);
    setSearchValue("");
  };

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/uv-term-based/courses", {});
        setFetchCourses(response.data);
      } finally {
      }
    };

    fetchData();
  }, [setTermsStore]);

  const addNewTerm = () => {
    setTermsStore([
      ...termsStore,
      {
        courses: [],
        units: 0,
      },
    ]);
  };

  // Handle search.
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<Course[]>([]);
  const handleSearch = (newValue: string) => {
    setSearchData([]);
    setSearchValue(newValue);

    if (!fetchCourses) {
      return;
    }

    if (newValue === "") {
      return;
    }

    setSearchData(fetchCourses.filter((c) => c.name.includes(newValue)));
  };

  // Handle courses.
  const addCourse = (term_id: number, course: Course | null) => {
    if (!course) return;

    if (coursesStore.includes(course.id)) {
      setCoursesStore(coursesStore.filter((c) => c !== course.id));
      setPassedUnitsStore(passedUnitsStore - course.unit);

      setTermsStore([
        ...termsStore.map((term, i) =>
          i === term_id
            ? {
                ...term,
                units: term.units - course.unit,
                courses: term.courses.filter((c) => c.id !== course.id),
              }
            : term,
        ),
      ]);
    } else {
      setCoursesStore([...coursesStore, course.id]);
      setPassedUnitsStore(passedUnitsStore + course.unit);

      setTermsStore([
        ...termsStore.map((term, i) =>
          i === term_id
            ? {
                ...term,
                units: term.units + course.unit,
                courses: [...term.courses, course],
              }
            : term,
        ),
      ]);
    }
  };

  return (
    <div className="space-y-3">
      {termsStore.map((term, i) => (
        <AnimatedDiv
          key={i}
          className="overflow-hidden rounded-2xl bg-gray-50 text-myBlack dark:bg-white/5 dark:bg-opacity-20 dark:text-gray-200"
        >
          <button
            className="relative flex w-full items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-0 p-4 text-xs transition-all hover:bg-opacity-5 md:p-6 md:text-base"
            onClick={() => toggleDropdown(i)}
          >
            <div className="flex items-center gap-4">
              <div className="font-bold">{generateTermName(i + 1, year)}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-light">
                <b className="font-bold">{term.units}</b> از{" "}
                {isTabestan(i + 1) ? 10 : 24} واحد
              </div>
              <div className={openIndex === i ? "rotate-180" : ""}>
                <ArrowDownIcon />
              </div>
              {i === termsStore.length - 1 && i > 10 && (
                <div
                  className="text-red-600"
                  onClick={() => {
                    setTermsStore(termsStore.slice(0, -1));
                  }}
                >
                  <TrashIcon />
                </div>
              )}
            </div>
          </button>

          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden bg-gray-100 p-4 dark:bg-black/20 md:mt-4"
              >
                <PrimaryInput
                  type="text"
                  placeholder="جستجو درس..."
                  onChange={(newValue) => handleSearch(newValue)}
                  value={searchValue}
                />

                {searchData?.filter(
                  (course) => !coursesStore.includes(course.id),
                ).length > 0 && (
                  <div>
                    <div className="mb-4 text-sm font-light text-myBlack dark:text-gray-200">
                      نتیجه جستجو:{" "}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchData.length > 0 &&
                        searchData
                          ?.filter(
                            (course) => !coursesStore.includes(course.id),
                          )
                          .map((course, index) => (
                            <CourseButton
                              key={index}
                              onClick={(course) =>
                                addCourse(i, course as Course)
                              }
                              course={course}
                              isSelected={coursesStore.includes(course.id)}
                              oneCoursePerTerm={course.oneCoursePerTerm}
                            />
                          ))}
                    </div>
                  </div>
                )}

                {fetchCourses &&
                  fetchCourses?.filter(
                    (c) =>
                      !coursesStore.includes(c.id) &&
                      c.defaultTerm &&
                      c.defaultTerm <= i + 1,
                  ).length > 0 && (
                    <div className="mt-4">
                      <div className="mb-4 text-sm font-light text-myBlack dark:text-gray-200">
                        درس های پیشفرض :{" "}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {fetchCourses
                          ?.filter(
                            (c) =>
                              !coursesStore.includes(c.id) &&
                              c.defaultTerm &&
                              c.defaultTerm <= i + 1,
                          )
                          .sort((a, b) =>
                            a.defaultTerm && b.defaultTerm
                              ? b.defaultTerm - a.defaultTerm
                              : 0,
                          )
                          .map((course, index) => (
                            <CourseButton
                              key={index}
                              onClick={(course) =>
                                addCourse(i, course as Course)
                              }
                              course={course}
                              isSelected={coursesStore.includes(course.id)}
                            />
                          ))}
                      </div>
                    </div>
                  )}

                {term.courses.length > 0 && (
                  <div className="mt-4">
                    <hr className="mb-4 border-myBlack/10 dark:border-white/10" />
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-sm font-light text-myBlack dark:text-gray-200">
                        درس های انتخاب شده:{" "}
                      </div>

                      {term.courses.length > 0 && (
                        <button
                          className={`flex items-center gap-2 rounded-lg border border-red-300/40 px-3 py-1.5 text-xs text-red-600 transition-all hover:bg-red-50 dark:border-red-400/30 dark:text-red-400 dark:hover:bg-red-500/10 md:text-sm`}
                          onClick={() => {
                            setTermsStore(
                              termsStore.map((t, index) => {
                                if (index === i) {
                                  setCoursesStore(
                                    coursesStore.filter(
                                      (c) =>
                                        !t.courses.find((cs) => cs.id === c),
                                    ),
                                  );

                                  setPassedUnitsStore(
                                    passedUnitsStore - t.units,
                                  );

                                  t.courses = [];
                                  t.units = 0;
                                }

                                return t;
                              }),
                            );
                          }}
                        >
                          <TrashIcon width={18} height={18} />
                          <span>حذف همه</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {term.courses.map((course, index) => (
                        <CourseButton
                          key={index}
                          onClick={(course) => addCourse(i, course as Course)}
                          course={course}
                          isSelected={coursesStore.includes(course.id)}
                          oneCoursePerTerm={course.oneCoursePerTerm}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedDiv>
      ))}

      {termsStore.length < 20 && (
        <button
          className="relative flex w-full items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-xs text-myBlack transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8 md:text-base"
          onClick={() => addNewTerm()}
        >
          <div className="flex items-center gap-4">
            <PlusIcon />
            <div className="font-light">افزودن ترم جدید</div>
          </div>
        </button>
      )}
    </div>
  );
}
