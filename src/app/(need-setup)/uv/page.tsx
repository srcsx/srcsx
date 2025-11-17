"use client";
import { useEffect, useState } from "react";
import SelectCourseStage from "@/components/pages/uv/stages/SelectCourseStage";
import FinalResultStage from "@/components/pages/uv/stages/FinalResultStage";
import { useRouter, useSearchParams } from "next/navigation";
import PageHeading from "@/components/layout/PageHeading";
import { useUserStore } from "@/store/userStore";
import { UV_STAGE_TYPE } from "@/types/uv";
import { useUvStore } from "@/store/uvStore";
import { usePageActions } from "@/store/usePageActions";
import { Course } from "@prisma/client";

export default function UVPage() {
  // Set search params.
  const params = useSearchParams();
  const coursesParam = params.get("courses");
  const {
    coursesStore,
    setCoursesStore,
    passedUnitsStore,
    setPassedUnitsStore,
  } = useUvStore();

  // Manage Stage.
  const [stage, setStage] = useState<UV_STAGE_TYPE>("SELECT_COURSE");

  const changeStage = (newStage: UV_STAGE_TYPE) => {
    setStage(newStage);

    if (newStage === "FINAL_RESULT") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?courses=${coursesStore.join(",")}`,
      );
      return;
    } else {
      window.history.replaceState(null, "", `${window.location.pathname}`);
    }
  };

  // Get user data.
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (coursesParam) {
      setCoursesStore(coursesParam.split(",").map((c) => parseInt(c)));
      setStage("FINAL_RESULT");
    }
  }, [coursesParam, setCoursesStore]);

  const setCourses = (
    course: Course[] | Course | null,
    remove: boolean = false,
  ) => {
    // Clear selected courses if course is null.
    if (course === null) {
      setCoursesStore([]);
      setPassedUnitsStore(0);
      return;
    }

    // Set array courses.
    if (Array.isArray(course)) {
      const alreadyCourses = course.filter((c) => coursesStore.includes(c.id));

      setCoursesStore(
        coursesStore.filter(
          (c) => !alreadyCourses.map((c) => c.id).includes(c),
        ),
      );

      if (remove) {
        setPassedUnitsStore(
          passedUnitsStore - alreadyCourses.reduce((acc, c) => acc + c.unit, 0),
        );

        return;
      }

      const newcoursesStore = [...coursesStore, ...course.map((c) => c.id)];

      setCoursesStore(newcoursesStore);

      setPassedUnitsStore(
        passedUnitsStore -
          alreadyCourses.reduce((acc, c) => acc + c.unit, 0) +
          course.reduce((acc, c) => acc + c.unit, 0),
      );

      return;
    }

    // Set course.
    if (coursesStore.includes(course.id)) {
      const newcoursesStore = coursesStore.filter((c) => c !== course.id);

      setCoursesStore(newcoursesStore);
      setPassedUnitsStore(passedUnitsStore - course.unit);
    } else {
      const newcoursesStore = [...coursesStore, course.id];

      setCoursesStore(newcoursesStore);
      setPassedUnitsStore(passedUnitsStore + course.unit);
    }
  };

  // Handle nav buttons.
  const router = useRouter();
  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (stage === "SELECT_COURSE") {
      setActions({
        onNext: () => setStage("FINAL_RESULT"),
        onNextText:
          passedUnitsStore !== 0
            ? `ادامه با ${passedUnitsStore} واحد`
            : "ادامه",
      });
    }

    if (stage === "FINAL_RESULT") {
      setActions({
        onBack: () => setStage("SELECT_COURSE"),
      });
    }

    return () => clearActions();
  }, [router, setActions, clearActions, stage, passedUnitsStore]);

  return (
    <div>
      <PageHeading title="بررسی واحد کلی" />

      {stage === "SELECT_COURSE" && (
        <SelectCourseStage
          changeStage={changeStage}
          selectedCourses={coursesStore}
          passedUnits={passedUnitsStore}
          setSelectedCourses={setCourses}
        />
      )}

      {user?.majorId && user.year && stage === "FINAL_RESULT" && (
        <FinalResultStage
          changeStage={changeStage}
          selectedCourses={coursesStore}
        />
      )}
    </div>
  );
}
