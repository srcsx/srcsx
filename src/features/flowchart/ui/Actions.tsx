import { flowchartPdfDownloader } from "@/features/flowchart/ui/FlowchartPdfDownloader";
import ToggleButton from "@/ui/utils/buttons/ToggleButton";

export default function Actions({
  showPassedCourses,
  setShowPassedCourses,
}: {
  showPassedCourses: "uv-term-based" | "uv" | null;
  setShowPassedCourses: React.Dispatch<
    React.SetStateAction<"uv-term-based" | "uv" | null>
  >;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <ToggleButton
        isSelected={showPassedCourses === "uv-term-based"}
        onClick={() =>
          showPassedCourses === "uv-term-based"
            ? setShowPassedCourses(null)
            : setShowPassedCourses("uv-term-based")
        }
      >
        فیلتر درس های پاس شده بر اساس واحد درسی (ترم)
      </ToggleButton>

      <ToggleButton
        isSelected={showPassedCourses === "uv"}
        onClick={() =>
          showPassedCourses === "uv"
            ? setShowPassedCourses(null)
            : setShowPassedCourses("uv")
        }
      >
        فیلتر درس های پاس شده بر واحد درسی
      </ToggleButton>

      <button
        onClick={() => flowchartPdfDownloader("flowchart-container")}
        className={`relative flex items-center justify-center gap-2 rounded-2xl border border-myBlack border-opacity-30 px-3 py-2 text-xs opacity-50 dark:border-white/10 dark:text-gray-200 md:px-6`}
      >
        دانلود PDF
      </button>
    </div>
  );
}
