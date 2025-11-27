"use client";
import TrashIcon from "@/assets/icons/TrashIcon";
import PrimaryInput from "@/components/utils/inputs/PrimaryInput";
import PageHeading from "@/components/layout/PageHeading";
import CourseButton from "@/components/pages/uv/CourseButton";
import axiosInstance from "@/utils/connect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CoursesCodesGuideBox from "@/components/pages/courses-codes/CoursesCodesGuideBox";
import PrimaryButton from "@/components/utils/buttons/PrimaryButton";
import { CopyIcon } from "@/assets/icons/CopyIcon";
import CourseCodesSkletons from "@/components/pages/courses-codes/CourseCodesSkletons";
import { Course } from "@/generated/prisma/client";

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
      <PageHeading title="کد درس ها" />

      <CoursesCodesGuideBox />

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
                  onChange={handleSearch}
                  value={searchValue}
                  placeholder="جستجو درس..."
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
                  <div className="mb-4 text-sm font-bold text-myBlack dark:text-gray-200">
                    درس های انتخاب شده:{" "}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    {selectedCourses.map((course, index) => (
                      <div
                        key={index}
                        className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3 font-light text-myBlack dark:bg-black dark:bg-opacity-20 dark:text-gray-200"
                      >
                        <div>{course.name}</div>
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
                            className="text-red-700 opacity-50"
                            onClick={() => handleSelectedCourse(course)}
                          >
                            <TrashIcon width={32} height={32} />
                          </button>
                        </div>
                      </div>
                    ))}
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
