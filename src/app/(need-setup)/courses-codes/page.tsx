"use client";
import TrashIcon from "@/assets/icons/TrashIcon";
import CourseButton from "@/features/uv/ui/CourseButton";
import axiosInstance from "@/utils/connect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CoursesCodesGuideBox from "@/features/courses-codes/ui/CoursesCodesGuideBox";
import { CopyIcon } from "@/assets/icons/CopyIcon";
import CourseCodesSkletons from "@/features/courses-codes/ui/CourseCodesSkletons";
import { Course } from "@/generated/prisma/client";
import PageHeading from "@/ui/layout/PageHeading";
import PrimaryInput from "@/ui/utils/inputs/PrimaryInput";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";
import PrimaryButton from "@/ui/utils/buttons/PrimaryButton";

export default function CoursesCodesPage() {
  // Main states.
  const [loading, setLoading] = useState(true);
  const [fetchCourses, setFetchCourses] = useState<Course[]>();

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
  }, []);

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

  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const handleSelectedCourse = (course: Course | null) => {
    if (!course) return;

    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
      return;
    }

    setSelectedCourses(selectedCourses.filter((c) => c != course));
  };

  const [copyText, setCopyText] = useState("کپی کن!");

  const copyCodes = () => {
    let f = "";

    for (const c of selectedCourses.filter((c) => c.amozeshyarCode)) {
      f += c.name + " / " + c.amozeshyarCode + "\n";
    }

    navigator.clipboard.writeText(f);

    setCopyText("کپی شد!");

    setTimeout(() => setCopyText("کپی کن!"), 1000);
  };

  const copyCode = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  return (
    <div className="pb-12">
      <PageHeading title="کد درس ها" guideBox={<CoursesCodesGuideBox />} />

      {loading && <CourseCodesSkletons />}

      {!loading && (
        <>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className=""
            >
              <div className="relative mb-8">
                <PrimaryInput
                  type="text"
                  onChange={(newValue) => handleSearch(newValue)}
                  value={searchValue}
                  placeholder="جستجو درس..."
                />
              </div>

              {searchData?.filter((course) => !selectedCourses.includes(course))
                .length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-bold text-myBlack dark:text-gray-200">
                    نتیجه جستجو:{" "}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchData.length > 0 &&
                      searchData
                        ?.filter((course) => !selectedCourses.includes(course))
                        .map((course, index) => (
                          <CourseButton
                            key={index}
                            onClick={(course) => handleSelectedCourse(course)}
                            course={course}
                          />
                        ))}
                  </div>
                </div>
              )}

              {selectedCourses.length > 0 && (
                <div className="mt-8">
                  <hr className="mb-8 border-myBlack/10 dark:border-white/10" />

                  <div className="mb-4 text-sm font-light text-myBlack dark:text-gray-200">
                    درس های انتخاب شده:{" "}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <AnimatePresence>
                      {selectedCourses.map((course, index) => (
                        <AnimatedDiv
                          key={index}
                          className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3 font-light text-myBlack dark:bg-white/5 dark:text-gray-200"
                        >
                          <div className="font-light">{course.name}</div>
                          <div className="flex items-center gap-2">
                            <div>{course.amozeshyarCode ?? "-"}</div>

                            {course.amozeshyarCode && (
                              <button
                                className="opacity-50"
                                onClick={(e) => {
                                  const el = e.currentTarget;
                                  copyCode(course.amozeshyarCode ?? "");
                                  el.classList.add("animate-ping");

                                  setTimeout(() => {
                                    el.classList.remove("animate-ping");
                                  }, 1000);
                                }}
                              >
                                <CopyIcon />
                              </button>
                            )}

                            <button
                              onClick={() => handleSelectedCourse(course)}
                              className="rounded-lg bg-red-100 px-1 py-1 text-sm font-light text-red-600"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </AnimatedDiv>
                      ))}
                    </AnimatePresence>
                  </div>

                  <PrimaryButton
                    onClick={() => copyCodes()}
                    icon={<CopyIcon />}
                    iconPosition="right"
                  >
                    {copyText}
                  </PrimaryButton>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
