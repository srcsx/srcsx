export default function HomeLogo({ classes }: { classes?: string }) {
  return (
    <div className={`${classes} mb-8 flex justify-center`}>
      <img
        src="/logo.png"
        className="block w-32 dark:hidden"
        alt="srcsx"
        fetchPriority="high"
      />
      <img
        src="/logo-dark.png"
        className="hidden w-32 dark:block"
        alt="srcsx"
        fetchPriority="high"
      />
    </div>
  );
}
