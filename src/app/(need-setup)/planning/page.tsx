"use client";
import PageHeading from "@/components/layout/PageHeading";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import UVTermBasedMainGuideBox from "@/components/pages/uv-term-based/UVTermBasedMainGuideBox";
import { Course as OriginCourse } from "@/generated/prisma/client";
import { useUserStore } from "@/store/userStore";
import { usePlanningStore } from "@/store/usePlanningStore";
import PrimaryInput from "@/components/utils/inputs/PrimaryInput";
import TrashIcon from "@/assets/icons/TrashIcon";
import CourseButton from "@/components/pages/planning/CourseButton";
import PlusIcon from "@/assets/icons/PlusIcon";
import Modal from "@/components/utils/Modal";

type Course = OriginCourse & { oneCoursePerTerm: boolean };

export default function UVTermBasedPage() {
  // Main states.
  const [fetchCourses, setFetchCourses] =
    useState<(Course & { defaultTerm: number })[]>();

  const {
    termsStore,
    setTermsStore,
    passedUnitsStore,
    setPassedUnitsStore,
    coursesStore,
    setCoursesStore,
  } = usePlanningStore();

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

  // Handle courses.
  const addCourse = (term_id: number, course: Course) => {
    if (coursesStore.includes(course.id)) {
      setCoursesStore(coursesStore.filter((c) => c !== course.id));
      setPassedUnitsStore(passedUnitsStore - course.unit);

      setTermsStore([
        ...termsStore.map((term, i) =>
          i === term_id
            ? {
                ...term,
                units: term.units - course.unit,
                courses: term.courses.filter((c) => c.course.id !== course.id),
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
                courses: [...term.courses, { course, isPassed: false }],
              }
            : term,
        ),
      ]);
    }
  };

  const passCourse = (termIndex: number, courseIndex: number) => {
    setTermsStore(
      termsStore.map((term, tIdx) => {
        if (tIdx !== termIndex) return term;

        return {
          ...term,
          courses: term.courses.map((course, cIdx) => {
            if (cIdx !== courseIndex) return course;
            return { ...course, isPassed: !course.isPassed };
          }),
        };
      }),
    );
  };

  const { user } = useUserStore();

  const generateTermName = (i: number) => {
    const year = user?.year;

    if (!year) {
      return i;
    }

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

  const [showRecommended, setShowRecommended] = useState(true);
  const [showTabestan, setShowTabestan] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [termIndex, setTermIndex] = useState<number>(0);

  return (
    <div className="pb-12">
      <PageHeading title="برنامه ریزی تحصیلی" />

      <UVTermBasedMainGuideBox />

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setShowRecommended(!showRecommended)}
          className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 text-sm dark:border-gray-200 dark:text-gray-200 md:px-6 ${
            showRecommended
              ? "border-[#0E465E] border-opacity-50 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text text-transparent opacity-100 dark:border-gray-200 dark:from-white dark:to-gray-200"
              : "opacity-50"
          }`}
        >
          <div
            className={`ml-2 h-4 w-4 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
              showRecommended
                ? "bg-gradient-to-bl from-myMain to-myBlack dark:from-white dark:to-gray-200"
                : ""
            }`}
          ></div>
          نمایش پیشنهاد‌ها
        </button>
        <button
          onClick={() => setShowTabestan(!showTabestan)}
          className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 text-sm dark:border-gray-200 dark:text-gray-200 md:px-6 ${
            showTabestan
              ? "border-[#0E465E] border-opacity-50 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text text-transparent opacity-100 dark:border-gray-200 dark:from-white dark:to-gray-200"
              : "opacity-50"
          }`}
        >
          <div
            className={`ml-2 h-4 w-4 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
              showTabestan
                ? "bg-gradient-to-bl from-myMain to-myBlack dark:from-white dark:to-gray-200"
                : ""
            }`}
          ></div>
          نمایش ترم های تابستان
        </button>
      </div>

      <div className="no-scrollbar flex snap-y snap-mandatory gap-2 overflow-x-auto scroll-smooth whitespace-nowrap">
        {termsStore.map((term, i) => {
          if (!showTabestan && isTabestan(i + 1)) {
            return;
          }

          return (
            <div
              key={i}
              className="min-w-[360px] rounded-2xl bg-myMain bg-opacity-5 p-4 text-myBlack dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:min-w-[500px]"
            >
              <div className="mb-8 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 rounded-full bg-gray-200 px-4 py-2 font-light dark:bg-black dark:bg-opacity-20">
                  ترم {generateTermName(i + 1)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-light">
                    <b className="font-bold">{term.units}</b> از{" "}
                    {isTabestan(i + 1) ? 10 : 24} واحد
                  </div>
                  {i === termsStore.length - 1 && i > 10 && (
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setTermsStore(termsStore.slice(0, -1));
                      }}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative mb-4">
                <button
                  onClick={() => {
                    setTermIndex(i);
                    setShowModal(true);
                  }}
                  className="block w-full rounded-xl border border-myBlack border-opacity-10 bg-white px-4 py-4 text-right text-sm focus:outline-[#0E465E] dark:bg-white dark:bg-opacity-10 dark:text-white md:px-6"
                >
                  جستجو درس...
                </button>
              </div>

              <div className="no-scrollbar h-[400px] space-y-2 overflow-y-scroll pt-4">
                {term.courses.map((c, index) => (
                  <CourseButton
                    key={index}
                    courseAction={() => addCourse(i, c.course)}
                    included={coursesStore.includes(c.course.id)}
                    course={c.course}
                    isPassed={c.isPassed}
                    passedAction={() => passCourse(i, index)}
                  />
                ))}

                {showRecommended &&
                  fetchCourses &&
                  fetchCourses?.filter(
                    (c) =>
                      !coursesStore.includes(c.id) &&
                      c.defaultTerm &&
                      c.defaultTerm <= i + 1,
                  ).length > 0 && (
                    <>
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
                            courseAction={() => addCourse(i, course)}
                            included={coursesStore.includes(course.id)}
                            course={course}
                            isPassed={false}
                          />
                        ))}
                    </>
                  )}
              </div>
            </div>
          );
        })}

        {termsStore.length < 20 && (
          <button
            onClick={() => addNewTerm()}
            className="flex min-w-[360px] items-center justify-center rounded-2xl bg-myMain bg-opacity-5 p-4 text-myBlack dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:min-w-[500px]"
          >
            <PlusIcon width={32} height={32} />
            افزودن
          </button>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="جستجو"
      >
        <div>
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

          <div className="no-scrollbar h-[300px] space-y-2 overflow-y-scroll">
            {searchData?.filter((course) => !coursesStore.includes(course.id))
              .length > 0 && (
              <>
                <div className="mb-4 text-sm font-light text-myBlack dark:text-gray-200">
                  نتیجه جستجو:{" "}
                </div>
                {searchData.length > 0 &&
                  searchData
                    ?.filter((course) => !coursesStore.includes(course.id))
                    .map((course, index) => (
                      <CourseButton
                        key={index}
                        courseAction={() => addCourse(termIndex, course)}
                        included={coursesStore.includes(course.id)}
                        course={course}
                        isPassed={false}
                      />
                    ))}
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
