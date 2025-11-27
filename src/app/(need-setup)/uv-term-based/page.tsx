"use client";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import PrimaryInput from "@/components/utils/inputs/PrimaryInput";
import PageHeading from "@/components/layout/PageHeading";
import SelectHeading from "@/components/layout/SelectHeading";
import CourseButton from "@/components/pages/uv/CourseButton";
import FinalCoursesResult from "@/components/pages/uv/FinalCoursesResult";
import { UVFinalResult } from "@/types/uv";
import axiosInstance from "@/utils/connect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SelectCoursesSkleton from "@/components/pages/uv-term-based/SelectCoursesSkleton";
import { useUvTermBasedStore } from "@/store/uvTermBasedStore";
import UVTermBasedMainGuideBox from "@/components/pages/uv-term-based/UVTermBasedMainGuideBox";
import { useRouter } from "next/navigation";
import { usePageActions } from "@/store/usePageActions";
import { Course } from "@/generated/prisma/client";

interface ResultType {
  issues: { term: number; message: string }[];
  result: UVFinalResult;
}

export default function UVTermBasedPage() {
  // Main states.
  const [loading, setLoading] = useState(true);
  const [fetchCourses, setFetchCourses] =
    useState<(Course & { defaultTerm: number })[]>();
  const [stage, setStage] = useState<"SELECT_COURSES" | "FINAL">(
    "SELECT_COURSES",
  );

  const {
    termsStore,
    setTermsStore,
    passedUnitsStore,
    setPassedUnitsStore,
    coursesStore,
    setCoursesStore,
  } = useUvTermBasedStore();

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/uv-term-based/courses", {});
        setFetchCourses(response.data);
      } finally {
        setLoading(false);
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData([]);
    setSearchValue(e.target.value);

    if (!fetchCourses) {
      return;
    }

    if (e.target.value === "") {
      return;
    }

    setSearchData(fetchCourses.filter((c) => c.name.includes(e.target.value)));
  };

  // Handle term boxes dropdown.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setSearchData([]);
    setSearchValue("");
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

  // Handle result.
  const [fetchResult, setFetchResult] = useState<ResultType>();

  const submit = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/uv-term-based/result",
        termsStore.map((t) => t.courses.map((c) => c.id)),
      );

      setFetchResult(response.data);
      setStage("FINAL");
    } finally {
      setLoading(false);
    }
  };

  // Handle nav buttons.
  const router = useRouter();
  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (stage === "SELECT_COURSES") {
      setActions({
        onNext: () => submit(),
        onNextText:
          passedUnitsStore !== 0
            ? `ادامه با ${passedUnitsStore} واحد`
            : "ادامه",
      });
    }

    if (stage === "FINAL") {
      setActions({
        onBack: () => setStage("SELECT_COURSES"),
      });
    }

    return () => clearActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setActions, clearActions, stage, passedUnitsStore]);

  return (
    <div className="pb-12">
      <PageHeading title="بررسی واحد بر اساس ترم" />

      <UVTermBasedMainGuideBox />

      {loading && <SelectCoursesSkleton />}

      {!loading && (
        <>
          {stage === "SELECT_COURSES" && (
            <div className="space-y-2">
              {termsStore.map((term, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-myMain bg-opacity-5 text-myBlack dark:bg-black dark:bg-opacity-20 dark:text-gray-200"
                >
                  <button
                    className="relative flex w-full items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-0 p-6 text-xs transition-all hover:bg-opacity-5 md:p-8 md:text-base"
                    onClick={() => toggleDropdown(i)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-bold">ترم {i + 1}</div>
                      <div className="font-light">
                        {term.units} واحد پاس شده
                      </div>
                    </div>
                    <div className={openIndex === i ? "rotate-180" : ""}>
                      <ArrowDownIcon />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-4 overflow-hidden rounded-lg bg-gray-100 p-4 dark:bg-black dark:bg-opacity-20"
                      >
                        <div className="relative mb-8">
                          <PrimaryInput
                            type="text"
                            onChange={handleSearch}
                            placeholder="جستجو درس..."
                            value={searchValue}
                          />
                          {searchValue.length > 0 && (
                            <button
                              onClick={() => {
                                setSearchData([]);
                                setSearchValue("");
                              }}
                              className="absolute left-2 top-2 rounded-lg bg-red-100 px-2 py-2 text-sm font-light text-red-600"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </div>

                        {searchData?.filter(
                          (course) => !coursesStore.includes(course.id),
                        ).length > 0 && (
                          <div>
                            <div className="mb-2 text-sm font-bold text-myBlack dark:text-gray-200">
                              نتیجه جستجو:{" "}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {searchData.length > 0 &&
                                searchData
                                  ?.filter(
                                    (course) =>
                                      !coursesStore.includes(course.id),
                                  )
                                  .map((course, index) => (
                                    <CourseButton
                                      key={index}
                                      onClick={(course) => addCourse(i, course)}
                                      course={course}
                                      isSelected={coursesStore.includes(
                                        course.id,
                                      )}
                                    />
                                  ))}
                            </div>
                          </div>
                        )}

                        {fetchCourses &&
                          fetchCourses?.filter(
                            (c) => !coursesStore.includes(c.id),
                          ).length > 0 && (
                            <div className="mt-4">
                              <div className="mb-2 text-sm font-bold text-myBlack dark:text-gray-200">
                                درس های پیشفرض ترم {i + 1}:{" "}
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
                                      onClick={(course) => addCourse(i, course)}
                                      course={course}
                                      isSelected={coursesStore.includes(
                                        course.id,
                                      )}
                                    />
                                  ))}
                              </div>
                            </div>
                          )}

                        {term.courses.length > 0 && (
                          <div className="mt-4">
                            <div className="mb-2 text-sm font-bold text-myBlack dark:text-gray-200">
                              درس های انتخاب شده:{" "}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {term.courses.map((course, index) => (
                                <CourseButton
                                  key={index}
                                  onClick={(course) => addCourse(i, course)}
                                  course={course}
                                  isSelected={coursesStore.includes(course.id)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {termsStore.length < 14 && (
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
          )}

          {stage === "FINAL" && fetchResult && (
            <div>
              <h2 className="mb-4 text-myBlack dark:text-gray-200">
                نتیجه نهایی:{" "}
              </h2>

              {fetchResult.issues.length > 0 && (
                <div className="mb-8">
                  <SelectHeading title="مشکلات واحدها" />

                  {fetchResult.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="mb-2 rounded-2xl bg-orange-50 p-4 text-sm font-light text-orange-700 dark:bg-black dark:bg-opacity-5"
                    >
                      <h4 className="mb-1 font-bold">ترم {issue.term}</h4>
                      {issue.message}
                    </div>
                  ))}
                </div>
              )}

              {fetchResult.result.data.length > 0 ? (
                <div>
                  <SelectHeading title="وضعیت واحدها" />

                  <FinalCoursesResult final={fetchResult.result} />
                </div>
              ) : (
                <div>
                  <SelectHeading title="وضعیت واحدها" />

                  <div>بنظر میاد تمام واحد های مورد نیاز پاس شده.</div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
