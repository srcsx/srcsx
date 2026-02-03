"use client";
import { OfferedCourse } from "@/generated/prisma/client";
import PageHeading from "@/ui/layout/PageHeading";
import ToggleButton from "@/ui/utils/buttons/ToggleButton";
import ScrollableSelectBox from "@/ui/utils/inputs/ScrollableSelectBox";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Day =
  | "پنج‌شنبه"
  | "جمعه"
  | "شنبه"
  | "یکشنبه"
  | "دوشنبه"
  | "سه‌شنبه"
  | "چهارشنبه";

export default function CourseOfferingsPage() {
  const [data, setData] = useState<OfferedCourse[]>([]);

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/offered-courses", {
          params: { term: "4042" },
        });
        setData(response.data);
      } finally {
      }
    };

    fetchData();
  }, []);

  const [showExtraData, setShowExtraData] = useState(false);
  const [showRedCourses, setShowRedCourses] = useState(true);

  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  return (
    <div>
      <PageHeading
        title="درس های ارائه شده"
        guideBox={
          <>
            <div>
              درس های قرمز رنگ به معنی اینه که درس ها داخل دیتابیس SRCSX نیست و
              این به این دلایل اتفاق میفته:
              <ul className="mt-1">
                <li>- کد درس داخل آموزشیار اشتباه ثبت شده.</li>
                <li>- درس برای رشته شما ارائه نشده.</li>
              </ul>
            </div>
          </>
        }
      />

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

        {/* <ToggleButton
          isSelected={showExtraData}
          onClick={() => {
            setShowExtraData(!showExtraData);
          }}
        >
          فیلتر درس های پاس شده (ترمیک)
        </ToggleButton>

        <ToggleButton
          isSelected={showRedCourses}
          onClick={() => {
            setShowRedCourses(!showRedCourses);
          }}
        >
          فیلتر درس های پاس شده (کلی)
        </ToggleButton> */}
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
            <thead className="border-b border-gray-200 bg-gray-50 text-xs text-gray-500 dark:border-black/50 dark:bg-white/5 dark:text-gray-100">
              <tr>
                {/* <th className="px-6 py-4 text-center font-medium">#</th> */}
                <th className="px-6 py-4 text-center font-medium">کد درس</th>
                <th className="px-6 py-4 text-center font-medium">کد ارائه</th>
                <th className="px-6 py-4 text-center font-medium">نام درس</th>
                <th className="px-6 py-4 text-center font-medium">استاد</th>

                <th className="px-6 py-4 text-center font-medium">روز</th>
                <th className="px-6 py-4 text-center font-medium">ساعت شروع</th>
                <th className="px-6 py-4 text-center font-medium">
                  ساعت پایان
                </th>

                <th className="px-6 py-4 text-center font-medium">واحد درس</th>

                <th className="px-6 py-4 text-center font-medium">
                  تاریخ امتحان
                </th>

                {showExtraData && (
                  <>
                    <th className="px-6 py-4 text-center font-medium">نظری</th>
                    <th className="px-6 py-4 text-center font-medium">عملی</th>
                    <th className="px-6 py-4 text-center font-medium">ظرفیت</th>
                    <th className="px-6 py-4 text-center font-medium">نوع</th>
                    <th className="px-6 py-4 text-center font-medium">
                      اطلاعات بیشتر
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {data.map((c, i) => {
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
                      className={`border-b border-gray-100 transition hover:bg-gray-50 dark:border-black/50 dark:hover:bg-white/10 ${c.isCourseMissing ? "bg-red-800/5" : ""}`}
                    >
                      {/* <td className="px-6 py-4 text-center">
                      <button className="h-6 w-6 rounded-lg border border-black/5 dark:border-white/10"></button>
                    </td> */}
                      <td className="px-6 py-4 text-center">{c.code}</td>
                      <td className="px-6 py-4 text-center">{c.eraeCode}</td>
                      <td className="min-w-[150px] px-6 py-4 text-right font-bold">
                        {c.name}
                      </td>
                      <td className="min-w-[150px] px-6 py-4 text-center">
                        {c.teacher}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {c.dayOfWeek ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {c.startTime ?? "-"}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {c.endTime ?? "-"}
                      </td>

                      <td className="px-6 py-4 text-center">{c.unit}</td>

                      <td className="min-w-[150px] px-6 py-4 text-center">
                        {c.examDate
                          ? c.examDate +
                            " - از " +
                            c.examStartTime +
                            " تا " +
                            c.examEndTime
                          : " - "}
                      </td>

                      {showExtraData && (
                        <>
                          <td className="px-6 py-4 text-center">
                            {c.theoUnit}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {c.pracUnit}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {c.capacity}
                          </td>
                          <td className="px-6 py-4 text-center">{c.type}</td>
                          <td className="px-6 py-4 text-center">
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
    </div>
  );
}
