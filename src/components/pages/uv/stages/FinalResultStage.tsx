"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/connect";
import FinalCoursesResult from "../FinalCoursesResult";
import { UV_STAGE_TYPE, UVFinalResult } from "@/types/uv";
import UVMainGuideBox from "../UVMainGuideBox";

export default function FinalResultStage({
  changeStage,
  selectedCourses,
}: {
  changeStage: (str: UV_STAGE_TYPE) => void;
  selectedCourses: number[];
}) {
  // Main states.
  const [final, setFinal] = useState<UVFinalResult>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/uv/result", {
          courses: selectedCourses,
        });

        setFinal(response.data);
      } catch {
        changeStage("SELECT_COURSE");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCourses, changeStage]);

  return (
    <div>
      {loading && (
        <div className="mb-8 h-[30px] w-full animate-pulse rounded-lg bg-gray-200"></div>
      )}

      {!loading && (
        <>
          {final && final.data.length > 0 && (
            <>
              <UVMainGuideBox />
              <FinalCoursesResult final={final} />
            </>
          )}

          {final && final.data.length == 0 && (
            <div className="mb-8 font-light">
              <p className="text-center">بنظر میاد تمام درس هاتو پاس کردی</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
