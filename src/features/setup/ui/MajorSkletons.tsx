export default function MajorSkletons() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="skleton-design h-[50px] w-[150]"></div>
        <div className="skleton-design h-[50px] w-[150]"></div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 1403 - 1396 + 1 }, (_, i) => 1396 + i).map(
          (year) => (
            <div key={year} className="skleton-design h-[40px] w-[70px]"></div>
          ),
        )}
      </div>

      <div className="flex justify-start">
        <div className="skleton-design h-[50px] w-[135px]"></div>
      </div>
    </div>
  );
}
