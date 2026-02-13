"use client";
import PageHeading from "@/ui/layout/PageHeading";
import axiosInstance from "@/utils/connect";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ScrollableSelectBox from "@/ui/utils/inputs/ScrollableSelectBox";
import { Course } from "@/features/courses/type";

type SortDirection = "asc" | "desc" | null;

export default function CoursesList() {
  const searchParams = useSearchParams();

  const [type, setType] = useState<"general" | "major" | null>(
    (searchParams.get("type") as "general" | "major") ?? null,
  );

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/courses-list", {
          params: { type },
        });
        setCourses(response.data);
      } finally {
      }
    };

    fetchData();
  }, [type]);

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

  const SortIcon = ({ active, direction }: any) => {
    if (!active) return <span className="opacity-50">⇅</span>;
    if (direction === "asc") return <span>↑</span>;
    if (direction === "desc") return <span>↓</span>;
  };

  return (
    <div>
      <PageHeading title="لیست درس‌ها" />

      <div className="mb-4">
        <ScrollableSelectBox
          selectedItem={type}
          items={[
            { label: "تمام درس‌ها", value: null },
            { label: "تخصصی‌ها", value: "major" },
            { label: "عمومی‌ها", value: "general" },
          ]}
          onChange={(n) => {
            setType(n.value as "major" | "general" | null);
          }}
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
                <th className="px-3 py-3 text-center font-medium">کد درس</th>

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

                <th className="px-3 py-3 text-center font-medium">پیشنیاز</th>

                <th className="px-3 py-3 text-center font-medium">واحد درس</th>
                <th className="px-3 py-3 text-center font-medium">واحد نظری</th>
                <th className="px-3 py-3 text-center font-medium">واحد عملی</th>
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
                      className={`border-b border-gray-100 text-xs text-black/80 transition hover:bg-gray-50 dark:border-black/50 dark:text-gray-200 dark:hover:bg-white/10`}
                    >
                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {i + 1}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {c.amozeshyarCode}
                      </td>
                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.name}
                      </td>

                      <td className="min-w-[120px] px-3 py-3 text-center">
                        {c.preCourseRequisites?.length || c.unitRequisites ? (
                          <>
                            {(c.preCourseRequisites ?? []).length > 0 && (
                              <>
                                {c.preCourseRequisites?.map((p, i) => (
                                  <span key={i}>
                                    {p.name} {p.corequisite ? "(همنیاز)" : ""}
                                    {i < c.preCourseRequisites!.length - 1 &&
                                      ", "}
                                  </span>
                                ))}
                              </>
                            )}

                            {(c.preCourseRequisites ?? []).length > 0 &&
                              c.unitRequisites &&
                              " | "}

                            {c.unitRequisites && (
                              <span>{c.unitRequisites} واحد</span>
                            )}
                          </>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-3 py-3 text-center">{c.unit}</td>
                      <td className="px-3 py-3 text-center">{c.theoUnit}</td>
                      <td className="px-3 py-3 text-center">{c.pracUnit}</td>
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
