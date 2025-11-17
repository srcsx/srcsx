export default function SelectHeading({
  title,
  mb = "mb-4",
}: {
  title: string;
  mb?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${mb}`}>
      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-myBlack to-myMain dark:from-white dark:to-gray-200"></div>
      <h2 className="font-light text-myBlack dark:text-gray-200">{title}</h2>
    </div>
  );
}
