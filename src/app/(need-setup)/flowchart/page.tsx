"use client";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import FlowchartNode from "@/features/flowchart/ui/FlowchartNode";
import FlowchartMainGuideBox from "@/features/flowchart/ui/FlowchartMainGuideBox";
import { useUvTermBasedStore } from "@/features/uv-term-based/store/useUvTermBasedStore";
import { Course } from "@/generated/prisma/client";
import { useUvStore } from "@/features/uv/store/useUvStore";
import Actions from "@/features/flowchart/ui/Actions";
import FlowchartSkletons from "@/features/flowchart/ui/FlowchartSkletons";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";
import PageHeading from "@/ui/layout/PageHeading";

type ModifiedCourse = Course & {
  childs?: ModifiedCourse[];
  required?: boolean;
};

export default function FlowchartPage() {
  // Main states.
  const [loading, setLoading] = useState(true);
  const [fetchCourses, setFetchCourses] = useState<ModifiedCourse[]>();

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/flowchart", {});
        setFetchCourses(response.data);
      } catch {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [showPassedCourses, setShowPassedCourses] = useState<
    "uv" | "uv-term-based" | null
  >(null);

  const uvTermBased = useUvTermBasedStore();
  const uv = useUvStore();

  return (
    <div className="">
      <PageHeading title="فلوچارت درسی" guideBox={<FlowchartMainGuideBox />} />

      {loading && <FlowchartSkletons />}

      {!loading && (
        <AnimatedDiv>
          <Actions
            setShowPassedCourses={setShowPassedCourses}
            showPassedCourses={showPassedCourses}
          />

          <div
            id="flowchart-container"
            className="relative overflow-y-hidden overflow-x-scroll"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            <div className={`inline-block space-y-2`}>
              {fetchCourses
                ?.sort((a, b) => {
                  const aCount = a.childs?.length ?? 0;
                  const bCount = b.childs?.length ?? 0;
                  const childCountDiff = bCount - aCount;
                  if (childCountDiff !== 0) return childCountDiff;

                  return (b.required ? 1 : 0) - (a.required ? 1 : 0);
                })
                .map((node, i) => (
                  <FlowchartNode
                    key={i}
                    node={node}
                    index={i + 1}
                    passedCourses={
                      showPassedCourses === "uv-term-based"
                        ? uvTermBased.coursesStore
                        : uv.coursesStore
                    }
                    showPassedCourses={showPassedCourses !== null}
                  />
                ))}
            </div>
          </div>
        </AnimatedDiv>
      )}
    </div>
  );
}
