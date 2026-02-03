"use client";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import { useUvTermBasedStore } from "@/features/uv-term-based/store/useUvTermBasedStore";
import UVTermBasedMainGuideBox from "@/features/uv-term-based/ui/UVTermBasedMainGuideBox";
import { useRouter } from "next/navigation";
import { usePageActions } from "@/store/usePageActions";
import { useUserStore } from "@/store/userStore";
import FinalResult from "@/features/uv-term-based/ui/Stages/FinalResult";
import SelectCourses from "@/features/uv-term-based/ui/Stages/SelectCourses";
import { ResultType } from "@/features/uv-term-based/types";
import PageHeading from "@/ui/layout/PageHeading";

export default function UVTermBasedPage() {
  // Main states.
  const [stage, setStage] = useState<"SELECT_COURSES" | "FINAL">(
    "SELECT_COURSES",
  );

  const {
    termsStore,
    setTermsStore,
    passedUnitsStore,
    setPassedUnitsStore,
    coursesStore,
    setCoursesStore,
  } = useUvTermBasedStore();

  // Handle result.
  const [fetchResult, setFetchResult] = useState<ResultType>();

  const submit = async () => {
    try {
      const response = await axiosInstance.post(
        "/uv-term-based/result",
        termsStore.map((t) => t.courses.map((c) => c.id)),
      );

      setFetchResult(response.data);
      setStage("FINAL");
    } finally {
    }
  };

  // Handle nav buttons.
  const router = useRouter();
  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (stage === "SELECT_COURSES") {
      setActions({
        onNext: () => submit(),
        onNextText:
          passedUnitsStore !== 0
            ? `ادامه با ${passedUnitsStore} واحد`
            : "ادامه",
      });
    }

    if (stage === "FINAL") {
      setActions({
        onBack: () => setStage("SELECT_COURSES"),
      });
    }

    return () => clearActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setActions, clearActions, stage, passedUnitsStore]);

  const { user } = useUserStore();

  return (
    <div className="pb-12">
      <PageHeading
        title="بررسی واحد بر اساس ترم"
        guideBox={<UVTermBasedMainGuideBox />}
      />

      <>
        {stage === "SELECT_COURSES" && (
          <SelectCourses
            year={user?.year!}
            termsStore={termsStore}
            setTermsStore={setTermsStore}
            passedUnitsStore={passedUnitsStore}
            setPassedUnitsStore={setPassedUnitsStore}
            coursesStore={coursesStore}
            setCoursesStore={setCoursesStore}
          />
        )}

        {stage === "FINAL" && fetchResult && (
          <FinalResult fetchResult={fetchResult} />
        )}
      </>
    </div>
  );
}
