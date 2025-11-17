export default function PrimaryInput({
  type = "text",
  onChange,
  placeholder,
  ref,
  value,
}: {
  type: "text";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      value={value}
      className="block w-full rounded-xl border border-myBlack border-opacity-10 px-4 py-4 text-base focus:outline-[#0E465E] dark:bg-white dark:bg-opacity-10 dark:text-white md:px-6"
    />
  );
}
