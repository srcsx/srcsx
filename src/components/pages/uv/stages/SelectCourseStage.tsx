import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/connect";
import CourseSkletons from "@/components/pages/uv/CourseSkletons";
import TrashIcon from "@/assets/icons/TrashIcon";
import CourseButton from "../CourseButton";
import PrimaryInput from "@/components/utils/inputs/PrimaryInput";
import { UV_STAGE_TYPE } from "@/types/uv";
import UVMainGuideBox from "../UVMainGuideBox";
import CoursesGroupSelectBox from "../CoursesGroupSelectBox";
import { Course, CourseGroup } from "@prisma/client";

export default function SelectCourseStage({
  setSelectedCourses,
  selectedCourses,
}: {
  changeStage: (str: UV_STAGE_TYPE) => void;
  setSelectedCourses: (
    course: Course[] | Course | null,
    remove?: boolean,
  ) => void;
  selectedCourses: number[];
  passedUnits: number;
}) {
  // Main states.
  const [data, setData] = useState<(CourseGroup & { courses: Course[] })[]>();
  const [loading, setLoading] = useState(true);

  // Fetch courses.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance("/uv/courses", {});
        setData(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search.
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<Course[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) {
      return;
    }

    setSearchData([]);
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      return;
    }

    data.forEach((group) => {
      group.courses.forEach((course) => {
        if (course.name.includes(e.target.value)) {
          setSearchData((prev) => [...prev, course]);
        }
      });
    });
  };

  return (
    <div>
      <UVMainGuideBox />

      {loading && <CourseSkletons />}

      {!loading && (
        <div>
          <div className="relative mb-8">
            <PrimaryInput
              type="text"
              onChange={handleSearch}
              placeholder="جستجو درس..."
              value={searchValue}
            />

            {searchValue.length > 0 && (
              <button
                onClick={() => {
                  setSearchData([]);
                  setSearchValue("");
                }}
                className="absolute left-2 top-2 rounded-lg bg-red-100 px-2 py-2 text-sm font-light text-red-600"
              >
                <TrashIcon />
              </button>
            )}
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {searchData.length > 0 &&
                searchData?.map((course, index) => (
                  <CourseButton
                    key={index}
                    onClick={(course) => setSelectedCourses(course)}
                    course={course}
                    isSelected={selectedCourses.includes(course.id)}
                  />
                ))}
            </div>

            {searchData.length === 0 && (
              <div className="space-y-8">
                {data?.map((group, index) => (
                  <CoursesGroupSelectBox
                    key={index}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                    group={group}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
