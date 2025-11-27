"use client";
import PageHeading from "@/components/layout/PageHeading";
import axiosInstance from "@/utils/connect";
import { useEffect, useState } from "react";
import SelectHeading from "@/components/layout/SelectHeading";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import FilesSkletons from "@/components/pages/files/FilesSkletons";
import { File } from "@/generated/prisma/client";

export default function FilesPage() {
  // Main states.
  const [loading, setLoading] = useState(true);
  const [syllabusFiles, setSyllabusFiles] = useState<File[]>();
  const [chartFiles, setChartFiles] = useState<File[]>();

  useEffect(() => {
    // Fetch data from api.
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/files", {});
        const data: File[] = response.data;

        setSyllabusFiles(data.filter((f) => f.type === "syllabus"));
        setChartFiles(data.filter((f) => f.type === "chart"));
      } catch {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <PageHeading title="سرفصل ها و چارت ها" />

      {loading && <FilesSkletons />}

      {!loading && (
        <div>
          <div className="mb-8">
            <SelectHeading title="سرفصل ها" />

            <div className="space-y-2">
              {syllabusFiles && syllabusFiles?.length > 0 ? (
                syllabusFiles.map((f, i) => (
                  <a
                    target="_blank"
                    href={f.url}
                    key={i}
                    className="flex w-full items-center gap-2 rounded-2xl bg-gray-100 px-4 py-4 text-sm text-myBlack transition-all hover:bg-gray-200 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 hover:dark:bg-opacity-40"
                  >
                    <DownloadIcon />
                    {f.title}
                  </a>
                ))
              ) : (
                <div className="text-sm font-light text-myBlack dark:text-gray-200">
                  موردی برای دانلود نیست.
                </div>
              )}
            </div>
          </div>

          <div>
            <SelectHeading title="چارت ها" />

            <div className="space-y-2">
              {chartFiles && chartFiles?.length > 0 ? (
                chartFiles.map((f, i) => (
                  <a
                    target="_blank"
                    href={f.url}
                    key={i}
                    className="flex w-full items-center gap-2 rounded-2xl bg-gray-100 px-4 py-4 text-sm text-myBlack transition-all hover:bg-gray-200 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 hover:dark:bg-opacity-40"
                  >
                    <DownloadIcon />
                    {f.title}
                  </a>
                ))
              ) : (
                <div className="text-sm font-light text-myBlack dark:text-gray-200">
                  موردی برای دانلود نیست.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
