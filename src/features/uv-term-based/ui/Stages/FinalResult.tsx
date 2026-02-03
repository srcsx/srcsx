import SelectHeading from "@/ui/layout/SelectHeading";
import { ResultType } from "../../types";
import FinalCoursesResult from "@/features/uv/ui/FinalCoursesResult";

export default function FinalResult({
  fetchResult,
}: {
  fetchResult: ResultType;
}) {
  return (
    <div>
      <h2 className="mb-4 text-myBlack dark:text-gray-200">نتیجه نهایی: </h2>

      {fetchResult.issues.length > 0 && (
        <div className="mb-8">
          <SelectHeading title="مشکلات واحدها" />

          {fetchResult.issues.map((issue, index) => (
            <div
              key={index}
              className="mb-2 rounded-2xl bg-orange-50 p-4 text-sm font-light text-orange-700 dark:bg-black dark:bg-opacity-5"
            >
              <h4 className="mb-1 font-bold">ترم {issue.term}</h4>
              {issue.message}
            </div>
          ))}
        </div>
      )}

      {fetchResult.result.data.length > 0 ? (
        <div>
          <SelectHeading title="وضعیت واحدها" />

          <FinalCoursesResult final={fetchResult.result} />
        </div>
      ) : (
        <div>
          <SelectHeading title="وضعیت واحدها" />

          <div>بنظر میاد تمام واحد های مورد نیاز پاس شده.</div>
        </div>
      )}
    </div>
  );
}
