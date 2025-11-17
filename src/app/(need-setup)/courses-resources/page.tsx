"use client";
import TrashIcon from "@/assets/icons/TrashIcon";
import PrimaryInput from "@/components/utils/inputs/PrimaryInput";
import PageHeading from "@/components/layout/PageHeading";
import CourseButton from "@/components/pages/uv/CourseButton";
import axiosInstance from "@/utils/connect";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CopyIcon } from "@/assets/icons/CopyIcon";
import CourseResourcesSkletons from "@/components/pages/courses-resources/CourseResourcesSkletons";
import CoursesResourcesGuideBox from "@/components/pages/courses-resources/CoursesResourcesGuideBox";
import { usePageActions } from "@/store/usePageActions";
import { Course, CourseResource } from "@prisma/client";

export default function CoursesResourcesPage() {
  // Main states.
  const [loading, setLoading] = useState(true);
  const [fetchCourses, setFetchCourses] = useState<Course[]>();

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/courses-resources");
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

  const [selectedCourse, setSelectedCourse] = useState<
    Course & { resources?: CourseResource[] }
  >();

  const handleSelectedCourse = (
    course: (Course & { resources?: CourseResource[] }) | null,
  ) => {
    if (!course) return;

    setSelectedCourse(course);
  };

  const copyThis = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  // Handle nav buttons.
  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (selectedCourse) {
      setActions({
        onBack: () => setSelectedCourse(undefined),
      });
    } else {
      clearActions();
    }

    return () => clearActions();
  }, [setActions, clearActions, selectedCourse]);

  return (
    <div className="pb-12">
      <PageHeading title="منابع درسی" />

      <CoursesResourcesGuideBox />

      {loading && <CourseResourcesSkletons />}

      {!loading && (
        <>
          {!selectedCourse && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className=""
              >
                <>
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

                  {searchData?.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-bold text-myBlack dark:text-gray-200">
                        نتیجه جستجو:{" "}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchData.length > 0 &&
                          searchData.map((course, index) => (
                            <CourseButton
                              key={index}
                              onClick={(course) => handleSelectedCourse(course)}
                              course={course}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </>
              </motion.div>
            </AnimatePresence>
          )}

          {selectedCourse && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className=""
              >
                <div>
                  <div className="mb-4 text-myBlack dark:text-gray-200">
                    منابع درس {'"' + selectedCourse.name + '"'}
                  </div>

                  <div className="mb-4 space-y-4">
                    {selectedCourse.resources?.map((r, i) => (
                      <div
                        key={i}
                        className="relative w-full gap-4 space-y-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-xs text-myBlack transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8 md:text-base"
                      >
                        {r.englishName && (
                          <div
                            dir="ltr"
                            className="flex items-center gap-2 font-bold"
                          >
                            {r.englishName}

                            <button
                              onClick={(e) => {
                                const el = e.currentTarget;

                                copyThis(r.englishName ?? "");

                                setTimeout(
                                  () => el.classList.remove("animate-ping"),
                                  1000,
                                );
                              }}
                            >
                              <CopyIcon width={18} height={18} />
                            </button>
                          </div>
                        )}

                        {r.persianName && (
                          <div className="flex items-center gap-2">
                            {r.persianName}

                            <button
                              onClick={(e) => {
                                const el = e.currentTarget;

                                el.classList.add("animate-ping");
                                copyThis(r.persianName ?? "");

                                setTimeout(
                                  () => el.classList.remove("animate-ping"),
                                  1000,
                                );
                              }}
                            >
                              <CopyIcon width={18} height={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}
    </div>
  );
}
