import AnimatedDiv from "./AnimatedDiv";

export default function SelectHeading({
  title,
  mb = "mb-4",
}: {
  title: string;
  mb?: string;
}) {
  return (
    <AnimatedDiv className={`flex items-center gap-1 ${mb}`}>
      <div className="flex gap-1">
        <div className="h-2 w-4 rounded-lg bg-myMain dark:bg-purple-200"></div>
        <div className="h-2 w-2 rounded-lg bg-myMain/80 dark:bg-purple-200/80"></div>
      </div>
      <h2 className="font-light text-myBlack dark:text-gray-200">{title}</h2>
    </AnimatedDiv>
  );
}
