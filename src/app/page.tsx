"use client";
import Feature from "@/features/home/ui/Feature";
import { features } from "@/features/home/utils/features";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1024px]">
      <motion.div
        className="grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {features.map((item, i) => (
          <Feature
            key={i}
            title={item.title}
            href={item.href}
            icon={item.icon}
            inProgress={item.inProgress}
            beta={item.beta}
            newItem={item.newItem}
            soon={item.soon}
            disabled={item.disabled}
          />
        ))}
      </motion.div>
    </div>
  );
}
