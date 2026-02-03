import { useEffect, useState } from "react";
import axiosInstance from "@/utils/connect";
import CourseSkletons from "@/features/uv/ui/CourseSkletons";
import CourseButton from "../CourseButton";
import { UV_STAGE_TYPE } from "@/types/uv";
import CoursesGroupSelectBox from "../CoursesGroupSelectBox";
import { Course, CourseGroup } from "@/generated/prisma/client";
import PrimaryInput from "@/ui/utils/inputs/PrimaryInput";

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

  const handleSearch = (newValue: string) => {
    if (!data) {
      return;
    }

    setSearchValue(newValue);

    if (newValue === "") {
      setSearchData([]);
      return;
    }

    data.forEach((group) => {
      group.courses.forEach((course) => {
        if (course.name.includes(newValue)) {
          setSearchData((prev) => [...prev, course]);
        }
      });
    });
  };

  return (
    <div>
      {loading && <CourseSkletons />}

      {!loading && (
        <div>
          <PrimaryInput
            type="text"
            placeholder="جستجو درس..."
            onChange={(newValue) => handleSearch(newValue)}
            value={searchValue}
          />

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
              <div className="space-y-4">
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
