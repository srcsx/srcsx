"use client";
import KidStarIcon from "@/assets/icons/KidStarIcon";
import { Course } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import Xarrow from "react-xarrows";

const COLORS = [
  "#64748b", // Cool Gray
  "#3b82f6", // Blue
  "#0d9488", // Deep Teal
  "#94a3b8", // Slate
  "#ef4444", // Red
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#eab308", // Yellow
  "#84cc16", // Lime
  "#22c55e", // Green
  "#10b981", // Emerald
  "#14b8a6", // Teal
  "#06b6d4", // Cyan
  "#0ea5e9", // Sky
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#a855f7", // Purple
  "#d946ef", // Fuchsia
  "#ec4899", // Pink
  "#f43f5e", // Rose
];

type ModifiedCourse = Course & {
  childs?: ModifiedCourse[];
  required?: boolean;
  unitRequisites?: number;
  prerequisite?: ModifiedCourse[];
  preCourseRequisites?: {
    courseRequisiteId: number;
    corequisite: boolean;
  }[];
};

export default function FlowchartNode({
  node,
  depth = 1,
  color,
  index,
  showPassedCourses,
  passedCourses,
}: {
  node: ModifiedCourse;
  index: number;
  depth?: number;
  color?: string;
  showPassedCourses?: boolean;
  passedCourses: number[];
}) {
  const thisColor = COLORS[depth - 1];

  const currentNodeId = `node-${node.id}`;

  return (
    <div className="flex items-center">
      <div className="relative">
        <div
          className={`relative flex min-w-[180px] items-center gap-2 overflow-hidden rounded-2xl border-2 bg-white px-3 py-1 text-center text-xs shadow-sm dark:bg-gray-800 ${
            showPassedCourses
              ? passedCourses.includes(node.id)
                ? "line-through opacity-50"
                : ""
              : ""
          }`}
          style={{ borderColor: thisColor }}
          id={currentNodeId}
        >
          {depth !== 1 && (
            <div
              className="absolute bottom-0 right-0 top-0 h-full w-2 rounded-full"
              style={{ background: color }}
            ></div>
          )}

          <div style={{ color: color ?? thisColor }} className="font-bold">
            {index}
          </div>
          <div
            className="h-1 w-1 rounded-full"
            style={{ background: color ?? thisColor }}
          ></div>
          <h3 className="font-semibold" style={{ color: thisColor }}>
            {node.name}
          </h3>
          <p className="rounded-full bg-gray-100 px-2 py-1 text-gray-500 dark:text-gray-400">
            {node.unit}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className={`absolute -top-[9px] left-1 flex items-center justify-center text-myBlack transition-all dark:text-gray-200`}
        >
          {node.required && <KidStarIcon />}
        </motion.div>
        {node.unitRequisites && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className={`absolute -bottom-4 left-0 right-0 flex items-center justify-center text-xs text-myBlack transition-all dark:text-gray-200`}
          >
            پس از اخذ {node.unitRequisites} واحد
          </motion.div>
        )}
      </div>

      {node.childs && node.childs.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="mx-4"></div>

          <div
            className={`flex flex-col ${depth > 0 ? "ml-6 space-y-4" : ""} `}
          >
            {node.childs.map((n, i) => {
              const childNodeId = `node-${n.id}`;

              if (n.preCourseRequisites && n.preCourseRequisites.length > 1) {
                if (
                  node.id !==
                  n.preCourseRequisites[n.preCourseRequisites.length - 1]
                    .courseRequisiteId
                ) {
                  return (
                    <React.Fragment key={i}>
                      <Xarrow
                        start={currentNodeId}
                        end={childNodeId}
                        color={"#00000050"}
                        strokeWidth={2}
                        headSize={4}
                        path={"straight"}
                        startAnchor="left"
                        endAnchor="right"
                        zIndex={0}
                        divContainerProps={{ id: "flowchart-container" }}
                        showHead={true}
                      />
                    </React.Fragment>
                  );
                }
              }

              return (
                <React.Fragment key={i}>
                  <Xarrow
                    start={currentNodeId}
                    end={childNodeId}
                    color={thisColor}
                    strokeWidth={
                      n.preCourseRequisites &&
                      n.preCourseRequisites[0].corequisite
                        ? 6
                        : 2
                    }
                    headSize={4}
                    path={"smooth"}
                    startAnchor="left"
                    endAnchor="right"
                    zIndex={0}
                    divContainerProps={{ id: "flowchart-container" }}
                    showHead={
                      n.preCourseRequisites &&
                      n.preCourseRequisites[0].corequisite
                        ? false
                        : true
                    }
                  />

                  <FlowchartNode
                    node={n}
                    key={i}
                    depth={depth + 1}
                    index={i + 1}
                    color={thisColor}
                    passedCourses={passedCourses}
                    showPassedCourses={showPassedCourses}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
