export default function HomeLogo({ classes }: { classes?: string }) {
  return (
    <div className={`${classes} mb-8 flex justify-center`}>
      <img
        src="/logo.png"
        className="w-32 filter will-change-transform dark:brightness-0 dark:contrast-0"
        alt="srcsx"
        fetchPriority="high"
      />
    </div>
  );
}
