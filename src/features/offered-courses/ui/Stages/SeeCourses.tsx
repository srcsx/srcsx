import { TickIcon } from "@/assets/icons/TickIcon";
import SelectHeading from "@/ui/layout/SelectHeading";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Course } from "../../type";

type SortDirection = "asc" | "desc" | null;

export default function SeeCourses({
  courses,
  selectedCourses,
  setSelectedCourses,
  passedUnits,
  setPassedUnits,
}: {
  courses: Course[];
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  passedUnits: number;
  setPassedUnits: React.Dispatch<React.SetStateAction<number>>;
}) {
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
    if (!sortConfig.key || !sortConfig.direction)
      return courses.filter((c) => selectedCourses.includes(c));

    const sorted = [...courses]
      .filter((c) => selectedCourses.includes(c))
      .sort((a, b) => {
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
  }, [courses, sortConfig, selectedCourses]);

  const SortIcon = ({ active, direction }: any) => {
    if (!active) return <span className="opacity-50">⇅</span>;
    if (direction === "asc") return <span>↑</span>;
    if (direction === "desc") return <span>↓</span>;
  };

  return (
    <div>
      <SelectHeading title="مشاهده درس های انتخابی" />

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
            className="w-full text-right text-xs"
          >
            <thead className="border-b border-gray-200 bg-gray-50 text-xs text-black dark:border-black/50 dark:bg-white/5 dark:text-gray-100">
              <tr>
                <th className="px-3 py-3 pr-4 text-center font-medium">#</th>
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
                  className="cursor-pointer select-none py-3 text-center font-medium"
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
                  className="cursor-pointer select-none py-3 text-center font-medium"
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
                  className="cursor-pointer select-none py-3 text-center font-medium"
                >
                  <div className="flex items-center justify-center gap-1">
                    <SortIcon
                      active={sortConfig.key === "endTime"}
                      direction={sortConfig.direction}
                    />
                    ساعت پایان
                  </div>
                </th>

                <th className="px-3 py-3 text-center font-medium">واحد درس</th>

                <th className="px-3 py-3 text-center font-medium">
                  تاریخ امتحان
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedCourses.map((c, i) => {
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
                      className={`border-b border-gray-100 text-black/80 transition hover:bg-gray-50 dark:border-black/50 dark:text-gray-200 dark:hover:bg-white/10 ${c.isCourseMissing ? "bg-red-800/5" : ""}`}
                    >
                      <td className="px-3 py-3 pr-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedCourses(
                              selectedCourses.filter((a) => a.id !== c.id),
                            );

                            setPassedUnits(passedUnits - c.unit);
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
                      <td className="px-3 py-3 text-center">{c.code}</td>
                      <td className="px-3 py-3 text-center">{c.eraeCode}</td>
                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.name}
                      </td>
                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.teacher}
                      </td>

                      <td className="py-3 text-center">{c.dayOfWeek ?? "-"}</td>
                      <td className="py-3 text-center">{c.startTime ?? "-"}</td>

                      <td className="py-3 text-center">{c.endTime ?? "-"}</td>

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
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
}
