"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/connect";
import SelectHeading from "@/components/layout/SelectHeading";
import { useUserStore } from "@/store/userStore";
import PageHeading from "@/components/layout/PageHeading";
import { useSearchParams } from "next/navigation";
import SelectButton from "@/components/pages/setup/SelectButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Major, University } from "@/generated/prisma/client";
import ThemeToggle from "@/components/pages/setup/ThemeToggle";
import CursorIcon from "@/assets/icons/CursorIcon";
import Modal from "@/components/utils/Modal";
import SetupGuideBox from "@/components/pages/setup/SetupGuideBox";

const firstYear = 1396;
const lastYear = 1404;

export default function SetupPage() {
  // Main states.
  const [universities, setUniversities] = useState<University[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [majorsLoading, setMajorsLoading] = useState(false);

  const [type, setType] = useState("bachelor");

  const params = useSearchParams();
  const nextRoute = params.get("next");

  // User store.
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const setData = async () => {
      setUniversitiesLoading(true);
      const universitiesResponse = await axiosInstance("/universities");
      setUniversities(universitiesResponse.data);
      setUniversitiesLoading(false);
    };

    setData();
  }, []);

  useEffect(() => {
    if (!user?.universityId) {
      return;
    }

    const setData = async () => {
      setMajorsLoading(true);
      const response = await axiosInstance("/majors", {
        params: { university: user?.universityId, type },
      });
      setMajors(response.data);
      setMajorsLoading(false);
    };

    setData();
  }, [user?.universityId, type]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeading title="تنظیمات" />

      <SetupGuideBox />

      <div className="mb-8">
        <div className="mb-8">
          <SelectHeading title="انتخاب مقطع" />
          <div className="flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap">
            {[
              { name: "bachelor", display_name: "کارشناسی" },
              { name: "master", display_name: "کارشناسی ارشد" },
              { name: "phd", display_name: "دکترا" },
            ].map((t) => (
              <SelectButton
                key={t.name}
                title={t.display_name}
                isSelected={type === t.name}
                onClick={() => setType(t.name)}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SelectHeading title="انتخاب دانشگاه" />
          {universitiesLoading ? (
            <div className="flex flex-wrap gap-2">
              <div className="skleton-design h-[50px] w-[150]"></div>
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap">
              {universities?.map((u) => (
                <SelectButton
                  key={u.id}
                  title={u.name}
                  isSelected={user?.universityId === u.id}
                  onClick={() => updateUser({ universityId: u.id })}
                />
              ))}
            </div>
          )}
        </div>

        {(majorsLoading || majors.length > 0) && (
          <div className="mb-8">
            <SelectHeading title="انتخاب رشته" />
            {majorsLoading ? (
              <div className="flex flex-wrap gap-2">
                <div className="skleton-design h-[50px] w-[150]"></div>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex gap-2 overflow-visible scroll-smooth whitespace-nowrap">
                  {majors?.map((major) => (
                    <SelectButton
                      key={major.id}
                      title={major.name}
                      isSelected={user?.majorId === major.id}
                      onClick={() => updateUser({ majorId: major.id })}
                      badgeStyle={
                        major.verificationLevel === 1
                          ? "major-1"
                          : major.verificationLevel === 2
                            ? "major-2"
                            : undefined
                      }
                    />
                  ))}
                </div>

                <button
                  className="inline-flex items-center rounded-lg bg-gray-200 px-2 py-2 text-xs font-light text-myBlack opacity-70 hover:opacity-100"
                  onClick={() => setIsModalOpen(true)}
                >
                  سطح ینی چی؟
                  <CursorIcon width={18} height={18} />
                </button>

                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="سطح بندی رشته ها"
                >
                  <div>
                    <div className="mb-2">
                      <b className="font-medium">رشته های بدون بج یا سطح 0:</b>{" "}
                      به رشته هایی که سرفصل آن ها تایید شده نیست.
                    </div>
                    <div className="mb-2">
                      <b className="font-medium">رشته های سطح 1:</b> به رشته
                      هایی که سرفصل آن ها توسط نماینده ها و دانشجو ها تایید شده
                      باشد.
                    </div>
                    <div className="mb-2">
                      <b className="font-medium">رشته های سطح 2:</b> به رشته
                      هایی که سرفصل آن ها توسط گروه آموزشی خود دانشگاه تایید شده
                      باشد.
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        )}

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
          <ThemeToggle />
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
    </div>
  );
}
