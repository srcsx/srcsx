"use client";
import PageHeading from "@/components/layout/PageHeading";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import FlowchartNode from "@/components/pages/flowchart/FlowchartNode";
import FlowchartMainGuideBox from "@/components/pages/flowchart/FlowchartMainGuideBox";
import { useUvTermBasedStore } from "@/store/uvTermBasedStore";
import FlowchartSkletons from "@/components/pages/flowchart/FlowchartSkletons";
import { Course } from "@/generated/prisma/client";
import { useUvStore } from "@/store/uvStore";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type ModifiedCourse = Course & {
  childs?: ModifiedCourse[];
  required?: boolean;
};

// pdf downloader
const downloadPDF = async () => {
  const element = document.getElementById("flowchart-container");
  if (!element) return;

  // padding
  const padding = 40;

  // Calculate the final dimensions including padding
  const width = element.scrollWidth + padding * 2;
  const height = element.scrollHeight + padding * 2;

  // Store original styles to restore later
  const originalOverflow = element.style.overflow;
  const originalPadding = element.style.padding;

  // Temporarily hide scrollbars and apply padding for clean rendering
  element.style.overflow = "hidden";
  element.style.padding = `${padding}px`;

  // Render element to PNG with custom width/height
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 1.5, // Good balance of quality vs file size
    width,
    height,
  });

  // Restore original styles
  element.style.overflow = originalOverflow;
  element.style.padding = originalPadding;

  // Create a PDF sized exactly to the rendered flowchart
  const pdf = new jsPDF({
    orientation: width > height ? "landscape" : "portrait",
    unit: "px",
    format: [width, height],
  });

  // Insert the PNG into the PDF
  pdf.addImage(dataUrl, "PNG", 0, 0, width, height);

  // Save the file
  pdf.save("flowchart.pdf");
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
      <PageHeading title="فلوچارت درسی" />

      <FlowchartMainGuideBox />

      {loading && <FlowchartSkletons />}

      {!loading && (
        <div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                showPassedCourses === "uv-term-based"
                  ? setShowPassedCourses(null)
                  : setShowPassedCourses("uv-term-based")
              }
              className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 text-sm dark:border-gray-200 dark:text-gray-200 md:px-6 ${
                showPassedCourses === "uv-term-based"
                  ? "border-[#0E465E] border-opacity-50 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text text-transparent opacity-100 dark:border-gray-200 dark:from-white dark:to-gray-200"
                  : "opacity-50"
              }`}
            >
              <div
                className={`ml-2 h-4 w-4 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
                  showPassedCourses === "uv-term-based"
                    ? "bg-gradient-to-bl from-myMain to-myBlack dark:from-white dark:to-gray-200"
                    : ""
                }`}
              ></div>
              فیلتر درس های پاس شده بر اساس واحد درسی (ترم)
            </button>
            <button
              onClick={() =>
                showPassedCourses === "uv"
                  ? setShowPassedCourses(null)
                  : setShowPassedCourses("uv")
              }
              className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 text-sm dark:border-gray-200 dark:text-gray-200 md:px-6 ${
                showPassedCourses === "uv"
                  ? "border-[#0E465E] border-opacity-50 bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text text-transparent opacity-100 dark:border-gray-200 dark:from-white dark:to-gray-200"
                  : "opacity-50"
              }`}
            >
              <div
                className={`ml-2 h-4 w-4 rounded-md border border-myBlack transition-all dark:border-gray-200 ${
                  showPassedCourses === "uv"
                    ? "bg-gradient-to-bl from-myMain to-myBlack dark:from-white dark:to-gray-200"
                    : ""
                }`}
              ></div>
              فیلتر درس های پاس شده بر واحد درسی
            </button>

            <button
              onClick={downloadPDF}
              className={`relative flex items-center justify-center rounded-xl border border-myBlack border-opacity-30 px-3 py-2 text-sm opacity-50 transition hover:opacity-100 dark:border-gray-200 dark:text-gray-200 md:px-6`}
            >
              دانلود PDF
            </button>
          </div>

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
        </div>
      )}
    </div>
  );
}
