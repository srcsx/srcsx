import React from "react";
import type { SVGProps } from "react";

export function QuestionVector(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none">
        <path
          fill="#212121"
          d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
        ></path>
        <path
          fill="url(#SVGvYoTHeap)"
          d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
        ></path>
        <path
          fill="#d9d9d9"
          d="M24.25 32a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-19c3.365 0 6.25 2.882 6.25 6.249c.002 2.12-.769 3.47-2.678 5.528l-1.015 1.087c-1.023 1.139-1.428 1.861-1.466 2.715l-.003.162l-.006.128l-.018.124a1.25 1.25 0 0 1-2.476-.234c-.013-1.789.677-3.012 2.308-4.785l1.027-1.098c1.358-1.492 1.828-2.373 1.827-3.626c0-1.987-1.765-3.75-3.75-3.75c-1.92 0-3.636 1.654-3.744 3.559l-.012.319A1.25 1.25 0 0 1 18 19.25c0-3.365 2.886-6.25 6.25-6.25"
        ></path>
        <path
          fill="url(#SVGYgdaIdOF)"
          d="M24.25 32a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-19c3.365 0 6.25 2.882 6.25 6.249c.002 2.12-.769 3.47-2.678 5.528l-1.015 1.087c-1.023 1.139-1.428 1.861-1.466 2.715l-.003.162l-.006.128l-.018.124a1.25 1.25 0 0 1-2.476-.234c-.013-1.789.677-3.012 2.308-4.785l1.027-1.098c1.358-1.492 1.828-2.373 1.827-3.626c0-1.987-1.765-3.75-3.75-3.75c-1.92 0-3.636 1.654-3.744 3.559l-.012.319A1.25 1.25 0 0 1 18 19.25c0-3.365 2.886-6.25 6.25-6.25"
        ></path>
        <defs>
          <linearGradient
            id="SVGvYoTHeap"
            x1={4}
            x2={44}
            y1={4}
            y2={44}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0fafff"></stop>
            <stop offset={1} stopColor="#2764e7"></stop>
          </linearGradient>
          <linearGradient
            id="SVGYgdaIdOF"
            x1={19.093}
            x2={25.229}
            y1={13.386}
            y2={35.858}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fdfdfd"></stop>
            <stop offset={1} stopColor="#cceaff"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
