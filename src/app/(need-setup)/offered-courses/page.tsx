"use client";
import { OfferedCourse } from "@/generated/prisma/client";
import PageHeading from "@/ui/layout/PageHeading";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import { usePageActions } from "@/store/usePageActions";
import SelectCourses from "@/features/offered-courses/ui/Stages/SelectCourses";
import SeeCourses from "@/features/offered-courses/ui/Stages/SeeCourses";

type Day =
  | "پنج‌شنبه"
  | "جمعه"
  | "شنبه"
  | "یکشنبه"
  | "دوشنبه"
  | "سه‌شنبه"
  | "چهارشنبه";

export default function CourseOfferingsPage() {
  const [stage, setStage] = useState<"SELECT_COURSES" | "SEE_COURSES">(
    "SELECT_COURSES",
  );

  const [type, setType] = useState<"general" | "main">("main");
  const [year, setYear] = useState<number>(4042);

  const [courses, setCourses] = useState<OfferedCourse[]>([]);

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/offered-courses", {
          params: { term: "4042" },
        });
        setCourses(response.data);
      } finally {
      }
    };

    fetchData();
  }, []);

  const [selectedCourses, setSelectedCourses] = useState<OfferedCourse[]>([]);

  const [passedUnits, setPassedUnits] = useState<number>(0);

  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (stage === "SELECT_COURSES") {
      setActions({
        onNext: () => setStage("SEE_COURSES"),
        onNextText: passedUnits + " واحد",
      });
    }

    if (stage === "SEE_COURSES") {
      setActions({
        onBack: () => setStage("SELECT_COURSES"),
        onNext: undefined,
      });
    }

    return () => clearActions();
  }, [setActions, clearActions, passedUnits, stage]);

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

      {stage === "SELECT_COURSES" && (
        <SelectCourses
          courses={courses}
          type={type}
          setType={setType}
          year={year}
          setYear={setYear}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          passedUnits={passedUnits}
          setPassedUnits={setPassedUnits}
          showExtraData={showExtraData}
          setShowExtraData={setShowExtraData}
          showRedCourses={showRedCourses}
          setShowRedCourses={setShowRedCourses}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      )}

      {stage === "SEE_COURSES" && (
        <SeeCourses
          courses={courses}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          passedUnits={passedUnits}
          setPassedUnits={setPassedUnits}
        />
      )}
    </div>
  );
}
