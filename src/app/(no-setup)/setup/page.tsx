"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/connect";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import SelectButton from "@/features/setup/ui/SelectButton";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { Major, University } from "@/generated/prisma/client";
import ThemeToggle from "@/features/setup/ui/ThemeToggle";
import CursorIcon from "@/assets/icons/CursorIcon";
import SetupGuideBox from "@/features/setup/ui/SetupGuideBox";
import { toast } from "react-toastify";
import PageHeading from "@/ui/layout/PageHeading";
import SelectHeading from "@/ui/layout/SelectHeading";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";
import Modal from "@/ui/utils/Modal";
import ScrollableSelectBox from "@/ui/utils/inputs/ScrollableSelectBox";
import { usePageActions } from "@/store/usePageActions";

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

  useEffect(() => {
    if (nextRoute) {
      toast.error("اطلاعات خود را وارد کنید", {
        style: {
          fontFamily: "Samim",
        },
        className: "error-toast",
      });
    }
  }, [nextRoute]);

  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (user?.majorId && user.year && nextRoute) {
      setActions({
        onNext: () => {
          window.location.href = nextRoute;
        },
      });
    }

    return () => clearActions();
  }, [setActions, clearActions, nextRoute, user?.majorId && user.year]);

  return (
    <div>
      <PageHeading title="تنظیمات" guideBox={<SetupGuideBox />} />

      <div className="mb-8">
        <div className="mb-8">
          <SelectHeading title="انتخاب مقطع" />
          <AnimatedDiv className="flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap">
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
          </AnimatedDiv>
        </div>

        <div className="mb-8">
          <SelectHeading title="انتخاب دانشگاه" />
          {universitiesLoading ? (
            <div className="flex flex-wrap gap-2">
              <div className="skleton-design h-[50px] w-[150]"></div>
            </div>
          ) : (
            <AnimatedDiv className="flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap">
              {universities?.map((u) => (
                <SelectButton
                  key={u.id}
                  title={u.name}
                  isSelected={user?.universityId === u.id}
                  onClick={() => updateUser({ universityId: u.id })}
                />
              ))}
            </AnimatedDiv>
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
                <AnimatedDiv className="mb-4 flex gap-2 overflow-visible scroll-smooth whitespace-nowrap">
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
                </AnimatedDiv>

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
          <AnimatedDiv className="overflow-hidden">
            <ScrollableSelectBox
              selectedItem={user?.year}
              items={Array.from(
                { length: lastYear - firstYear + 1 },
                (_, i) => firstYear + i,
              ).map((v) => {
                return { label: v.toString(), value: v };
              })}
              onChange={(n) => updateUser({ year: +n.value! })}
            />
          </AnimatedDiv>
        </div>

        <AnimatedDiv className="mb-8">
          <SelectHeading title="انتخاب تم" />
          <ThemeToggle />
        </AnimatedDiv>
      </div>
    </div>
  );
}
