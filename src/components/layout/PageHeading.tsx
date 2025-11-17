export default function PageHeading({ title }: { title: string }) {
  return (
    <h1 className="mb-8 border-r-4 border-[#0E465E] bg-gradient-to-r from-myBlack to-[#0E465E] bg-clip-text pb-1 pr-4 pt-1 text-right text-xl font-medium text-myBlack text-transparent dark:border-gray-200 dark:from-white dark:to-gray-200 dark:text-gray-200">
      {title}
    </h1>
  );
}
