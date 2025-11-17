import React from "react";
import type { SVGProps } from "react";

export function LibraryVector(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#SVG4iQ1Depv)"
          d="M3 5.5A2.5 2.5 0 0 1 5.5 3h2A2.5 2.5 0 0 1 10 5.5v21A2.5 2.5 0 0 1 7.5 29h-2A2.5 2.5 0 0 1 3 26.5zm9 0A2.5 2.5 0 0 1 14.5 3h2A2.5 2.5 0 0 1 19 5.5v21a2.5 2.5 0 0 1-2.5 2.5h-2a2.5 2.5 0 0 1-2.5-2.5zm9.8 2.105c-1.295.358-2.064 1.733-1.717 3.07l4.27 16.466c.348 1.338 1.678 2.131 2.973 1.773l1.875-.52c1.294-.357 2.063-1.732 1.716-3.07L26.647 8.86c-.348-1.338-1.678-2.131-2.973-1.773z"
        ></path>
        <path fill="url(#SVGcYfzfbnC)" d="M3 8h7v3H3z"></path>
        <path
          fill="url(#SVGcYfzfbnC)"
          d="M27.296 11.365L20.72 13.13l.753 2.904l6.576-1.764z"
        ></path>
        <path fill="url(#SVGcYfzfbnC)" d="M19 8h-7v3h7z"></path>
        <defs>
          <linearGradient
            id="SVG4iQ1Depv"
            x1={-18}
            x2={-16.286}
            y1={3}
            y2={38.067}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#43e5ca"></stop>
            <stop offset={1} stopColor="#2764e7"></stop>
          </linearGradient>
          <linearGradient
            id="SVGcYfzfbnC"
            x1={12}
            x2={20.493}
            y1={2.267}
            y2={5.253}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9ff0f9"></stop>
            <stop offset={1} stopColor="#6ce0ff"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
