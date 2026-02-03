import { HTMLMotionProps, motion } from "framer-motion";

type AnimatedDivProps = {
  children: React.ReactNode;
} & HTMLMotionProps<"div">;

export default function AnimatedDiv({ children, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
