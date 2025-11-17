import React from "react";
import type { SVGProps } from "react";

export default function MaintenanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M22.5 7.5H.5v7h22zm-18 7v9m-2 0h4m12-9v9m2 0h-4m-16-9l7-7m-2 7l7-7m-2 7l7-7m-2 7l7-7M6.5 5l-2 1.5l-2-1.5V3l2-1.5l2 1.5zm14 0l-2 1.5l-2-1.5V3l2-1.5l2 1.5z"
        strokeWidth={1}
      ></path>
    </svg>
  );
}
