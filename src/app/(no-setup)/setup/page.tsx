"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/connect";
import MajorSkletons from "@/components/pages/setup/MajorSkletons";
import SelectHeading from "@/components/layout/SelectHeading";
import { useUserStore } from "@/store/userStore";
import PageHeading from "@/components/layout/PageHeading";
import { useSearchParams } from "next/navigation";
import SelectButton from "@/components/pages/setup/SelectButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import PrimaryInput from "@/components/utils/inputs/PrimaryInput";
import TrashIcon from "@/assets/icons/TrashIcon";
import { Major } from "@prisma/client";

const firstYear = 1396;
const lastYear = 1404;

export default function SetupPage() {
  // Main states.
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();
  const nextRoute = params.get("next");

  useEffect(() => {
    const setData = async () => {
      setLoading(true);
      const response = await axiosInstance("/majors");
      setMajors(response.data);
      setLoading(false);
    };

    setData();
  }, []);

  // User store.
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);

  // Handle search.
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<Major[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData([]);
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      return;
    }

    setSearchData(
      majors.filter((major) => major.name.includes(e.target.value)),
    );
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.theme ?? "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      <PageHeading title="تنظیمات" />

      {loading && <MajorSkletons />}

      {!loading && (
        <div className="mb-8">
          <SelectHeading title="انتخاب رشته" />
          <div className="relative mb-4">
            <PrimaryInput
              type="text"
              onChange={handleSearch}
              placeholder=" جستجو بر اساس نام رشته..."
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

          <div className="mb-8 flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap">
            {searchData?.map((major) => (
              <SelectButton
                key={major.id}
                title={major.name}
                isSelected={user?.majorId === major.id}
                onClick={() => updateUser({ majorId: major.id })}
              />
            ))}
            {searchData.length == 0 &&
              majors?.map((major) => (
                <SelectButton
                  key={major.id}
                  title={major.name}
                  isSelected={user?.majorId === major.id}
                  onClick={() => updateUser({ majorId: major.id })}
                />
              ))}
          </div>

          <div className="mb-8">
            <SelectHeading title="انتخاب سال ورود" />
            <div className="flex flex-wrap gap-2">
              {Array.from(
                { length: lastYear - firstYear + 1 },
                (_, i) => firstYear + i,
              ).map((year) => (
                <SelectButton
                  key={year}
                  title={year.toString()}
                  isSelected={user?.year === year}
                  onClick={() => updateUser({ year })}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SelectHeading title="انتخاب تم" />
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} `}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${theme === "dark" ? "-translate-x-[22px]" : "-translate-x-[2px]"} `}
              />
            </button>
          </div>

          {user?.majorId && user.year && nextRoute && (
            <a
              href={nextRoute}
              className={`darK:text-gray-200 relative flex w-full items-center justify-between gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-sm text-myBlack transition-all hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:p-8 md:text-base`}
            >
              ادامه
              <ArrowLeftIcon />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
