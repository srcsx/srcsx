import TrashIcon from "@/assets/icons/TrashIcon";
import AnimatedDiv from "@/ui/layout/AnimatedDiv";

export default function PrimaryInput({
  type = "text",
  onChange,
  placeholder,
  ref,
  value,
}: {
  type: "text";
  onChange: (newValue: string) => void;
  placeholder: string;
  value: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <AnimatedDiv className="relative mb-8">
      <input
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        ref={ref}
        value={value}
        className="block w-full rounded-2xl border border-transparent bg-gray-50 px-4 py-4 text-base outline-none backdrop-blur-3xl placeholder:text-sm focus:border-gray-200 dark:bg-white/5 dark:text-white dark:focus:border-black/70 md:px-6"
      />

      {value !== "" && (
        <div className="absolute bottom-0 left-3 top-0 flex items-center justify-center">
          <button
            onClick={() => {
              onChange("");
            }}
            className="rounded-lg bg-red-100 px-1 py-1 text-sm font-light text-red-600"
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </AnimatedDiv>
  );
}
