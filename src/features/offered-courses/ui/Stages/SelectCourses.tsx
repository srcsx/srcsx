import { TickIcon } from "@/assets/icons/TickIcon";
import ToggleButton from "@/ui/utils/buttons/ToggleButton";
import ScrollableSelectBox from "@/ui/utils/inputs/ScrollableSelectBox";
import Modal from "@/ui/utils/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Course } from "../../type";

const timeToMinutes = (time?: string | null) => {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

type Day =
  | "پنج‌شنبه"
  | "جمعه"
  | "شنبه"
  | "یکشنبه"
  | "دوشنبه"
  | "سه‌شنبه"
  | "چهارشنبه";

type SortDirection = "asc" | "desc" | null;

export default function SelectCourses({
  courses,
  type,
  setType,
  year,
  setYear,
  selectedCourses,
  setSelectedCourses,
  passedUnits,
  setPassedUnits,
  showExtraData,
  setShowExtraData,
  showRedCourses,
  setShowRedCourses,
  selectedDay,
  setSelectedDay,
}: {
  courses: Course[];
  type: "main" | "general";
  setType: React.Dispatch<React.SetStateAction<"main" | "general">>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  passedUnits: number;
  setPassedUnits: React.Dispatch<React.SetStateAction<number>>;
  showExtraData: boolean;
  setShowExtraData: React.Dispatch<React.SetStateAction<boolean>>;
  showRedCourses: boolean;
  setShowRedCourses: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDay: Day | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Day | null>>;
}) {
  const [showWarnModal, setShowWarnModal] = useState<Course | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Course | null;
    direction: SortDirection;
  }>({
    key: null,
    direction: null,
  });

  const handleSort = (key: keyof Course) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }

      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }

      if (prev.direction === "desc") {
        return { key: null, direction: null };
      }

      return { key, direction: "asc" };
    });
  };

  const sortedCourses = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return courses;

    const sorted = [...courses].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal), "fa")
        : String(bVal).localeCompare(String(aVal), "fa");
    });

    return sorted;
  }, [courses, sortConfig]);

  const addCourse = (c: Course) => {
    const cStart = timeToMinutes(c.startTime);
    const cEnd = timeToMinutes(c.endTime);

    if (cStart !== null && cEnd !== null) {
      const conflictCourse = selectedCourses.find((sc) => {
        if (sc.dayOfWeek !== c.dayOfWeek) return false;

        const sStart = timeToMinutes(sc.startTime);
        const sEnd = timeToMinutes(sc.endTime);

        if (sStart === null || sEnd === null) return false;

        return cStart < sEnd && cEnd > sStart;
      });

      if (conflictCourse) {
        toast.error(
          `تداخل زمانی با درس «${conflictCourse.name}»
      (${conflictCourse.startTime} - ${conflictCourse.endTime})`,
          {
            style: {
              fontFamily: "Samim",
            },
            className: "error-toast",
          },
        );
        return;
      }
    }

    setSelectedCourses([...selectedCourses, c]);
    setPassedUnits(passedUnits + c.unit);
  };

  const SortIcon = ({ active, direction }: any) => {
    if (!active) return <span className="opacity-50">⇅</span>;
    if (direction === "asc") return <span>↑</span>;
    if (direction === "desc") return <span>↓</span>;
  };

  return (
    <div>
      <div className="mb-4 flex">
        <ScrollableSelectBox
          selectedItem={year}
          items={[{ label: "4042", value: 4042 }]}
          onChange={(n) => {
            setYear(n.value as number);
          }}
        />

        <ScrollableSelectBox
          selectedItem={type}
          items={[
            { label: "تخصصی", value: "main" },
            { label: "عمومی", value: "general", disabled: true },
          ]}
          onChange={(n) => {
            setType(n.value as "main" | "general");
          }}
        />
      </div>

      <div className="mb-4 flex gap-2 overflow-auto">
        <ToggleButton
          isSelected={showExtraData}
          onClick={() => {
            setShowExtraData(!showExtraData);
          }}
        >
          نمایش اطلاعات بیشتر
        </ToggleButton>

        <ToggleButton
          isSelected={showRedCourses}
          onClick={() => {
            setShowRedCourses(!showRedCourses);
          }}
        >
          نمایش درس های قرمز
        </ToggleButton>
      </div>

      <div className="mb-4">
        <ScrollableSelectBox
          selectedItem={selectedDay}
          items={[
            { label: "همه", value: null },
            { label: "شنبه", value: "شنبه" },
            { label: "یکشنبه", value: "یکشنبه" },
            { label: "دوشنبه", value: "دوشنبه" },
            { label: "سه‌شنبه", value: "سه‌شنبه" },
            { label: "چهارشنبه", value: "چهارشنبه" },
            { label: "پنج‌شنبه", value: "پنج‌شنبه" },
            { label: "جمعه", value: "جمعه" },
          ]}
          onChange={(n) => setSelectedDay(n.value as Day | null)}
        />
      </div>

      <div className="relative mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-400 shadow-sm dark:border-black/50 dark:bg-white/5 dark:text-gray-100">
        <div className="overflow-x-auto">
          <motion.table
            initial={{ height: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              height: "100%",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              height: { duration: 0.5, ease: "easeOut" },
              opacity: { delay: 0.1, duration: 0.5 },
            }}
            className="w-full text-right text-sm"
          >
            <thead className="border-b border-gray-200 bg-gray-50 text-xs text-black dark:border-black/50 dark:bg-white/5 dark:text-gray-100">
              <tr>
                <th className="px-3 py-3 pr-4 text-center font-medium">#</th>

                <th
                  onClick={() => handleSort("name")}
                  className="cursor-pointer select-none px-3 py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "name"}
                      direction={sortConfig.direction}
                    />
                    نام درس
                  </div>
                </th>
                <th
                  onClick={() => handleSort("teacher")}
                  className="cursor-pointer select-none px-3 py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "teacher"}
                      direction={sortConfig.direction}
                    />
                    استاد
                  </div>
                </th>

                <th
                  onClick={() => handleSort("dayOfWeek")}
                  className="cursor-pointer select-none px-3 py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "dayOfWeek"}
                      direction={sortConfig.direction}
                    />
                    روز
                  </div>
                </th>

                <th
                  onClick={() => handleSort("startTime")}
                  className="cursor-pointer select-none px-3 py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "startTime"}
                      direction={sortConfig.direction}
                    />
                    ساعت شروع
                  </div>
                </th>

                <th
                  onClick={() => handleSort("endTime")}
                  className="cursor-pointer select-none px-3 py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "endTime"}
                      direction={sortConfig.direction}
                    />
                    ساعت پایان
                  </div>
                </th>

                <th className="px-3 py-3 text-center font-medium">پیشنیاز</th>

                <th className="px-3 py-3 text-center font-medium">واحد درس</th>

                <th className="px-3 py-3 text-center font-medium">
                  تاریخ امتحان
                </th>

                <th className="px-3 py-3 text-center font-medium">کد درس</th>
                <th
                  onClick={() => handleSort("eraeCode")}
                  className="cursor-pointer select-none px-3 py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "eraeCode"}
                      direction={sortConfig.direction}
                    />
                    کد ارائه
                  </div>
                </th>

                {showExtraData && (
                  <>
                    <th className="px-3 py-3 text-center font-medium">نظری</th>
                    <th className="px-3 py-3 text-center font-medium">عملی</th>
                    <th className="px-3 py-3 text-center font-medium">ظرفیت</th>
                    <th className="px-3 py-3 text-center font-medium">نوع</th>
                    <th className="px-3 py-3 text-center font-medium">
                      اطلاعات بیشتر
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedCourses.map((c, i) => {
                  if (c.isCourseMissing && !showRedCourses) {
                    return;
                  }

                  if (selectedDay && selectedDay !== c.dayOfWeek) {
                    return;
                  }

                  return (
                    <motion.tr
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        opacity: 1,
                        height: "100%",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        height: { duration: 0.3, ease: "easeOut" },
                        opacity: { duration: 0.3 },
                      }}
                      key={i}
                      className={`border-b border-gray-100 text-xs text-black/80 transition hover:bg-gray-50 dark:border-black/50 dark:text-gray-200 dark:hover:bg-white/10 ${c.isCourseMissing ? "bg-red-800/5" : ""}`}
                    >
                      <td className="px-3 py-3 pr-4 text-center">
                        <button
                          onClick={() => {
                            if (selectedCourses.includes(c)) {
                              setSelectedCourses(
                                selectedCourses.filter((i) => i.id !== c.id),
                              );
                              setPassedUnits(passedUnits - c.unit);
                              return;
                            }

                            if (c.isCourseMissing) {
                              setShowWarnModal(c);
                              return;
                            }

                            addCourse(c);
                          }}
                          className={`flex h-6 w-6 items-center justify-center rounded-lg border border-black/5 dark:border-white/10 ${selectedCourses.includes(c) ? "bg-gray-100 dark:bg-white/10" : ""}`}
                        >
                          <AnimatePresence>
                            {selectedCourses.includes(c) && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 0.35,
                                  ease: "easeOut",
                                }}
                              >
                                <TickIcon />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </td>
                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.name}
                      </td>
                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.teacher}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {c.dayOfWeek ?? "-"}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {c.startTime ?? "-"}
                      </td>

                      <td className="px-3 py-3 text-center">
                        {c.endTime ?? "-"}
                      </td>

                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.course?.preCourseRequisites?.length > 0 ||
                        c.course?.unitRequisites?.length > 0 ? (
                          <>
                            {c.course.preCourseRequisites?.length > 0 &&
                              c.course.preCourseRequisites.map((p, i) => (
                                <span key={p.id}>
                                  {p.name} {p.corequisite ? "(همنیاز)" : ""}
                                  {i < c.course.preCourseRequisites.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}

                            {c.course.preCourseRequisites?.length > 0 &&
                              c.course.unitRequisites?.length > 0 &&
                              " | "}

                            {c.course.unitRequisites?.length > 0 &&
                              c.course.unitRequisites.map((u, i) => (
                                <span key={i}>
                                  {u.unit} واحد
                                  {i < c.course.unitRequisites.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                          </>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-3 py-3 text-center">{c.unit}</td>

                      <td className="min-w-[150px] px-3 py-3 text-center">
                        {c.examDate
                          ? c.examDate +
                            " - از " +
                            c.examStartTime +
                            " تا " +
                            c.examEndTime
                          : " - "}
                      </td>

                      <td className="px-3 py-3 text-center">{c.code}</td>
                      <td className="px-3 py-3 text-center">{c.eraeCode}</td>

                      {showExtraData && (
                        <>
                          <td className="px-3 py-3 text-center">
                            {c.theoUnit}
                          </td>
                          <td className="px-3 py-3 text-center">
                            {c.pracUnit}
                          </td>
                          <td className="px-3 py-3 text-center">
                            {c.capacity}
                          </td>
                          <td className="px-3 py-3 text-center">{c.type}</td>
                          <td className="px-3 py-3 text-center">
                            {c.className}
                          </td>
                        </>
                      )}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>

      <Modal
        isOpen={showWarnModal !== null}
        onClose={() => setShowWarnModal(null)}
        title="هشدار"
      >
        <div>
          <div className="mb-4">
            درس های قرمز رنگ به معنی اینه که درس ها داخل دیتابیس SRCSX نیست و
            این به این دلایل اتفاق میفته:
            <ul className="mt-1">
              <li>- کد درس داخل آموزشیار اشتباه ثبت شده.</li>
              <li>- درس برای رشته شما ارائه نشده.</li>
            </ul>
          </div>

          <div className="mb-8">با این حال آیا مطمئنی میخوای اضافش کنی؟</div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowWarnModal(null)}
              className="w-1/2 py-4"
            >
              لفو
            </button>
            <button
              className="w-1/2 rounded-2xl bg-white/5 py-4"
              onClick={() => {
                addCourse(showWarnModal!);
                setShowWarnModal(null);
              }}
            >
              آره
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
