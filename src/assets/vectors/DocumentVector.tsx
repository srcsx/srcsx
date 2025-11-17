import React from "react";
import type { SVGProps } from "react";

export function DocumentVector(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#SVGVtEbfDgM)"
          d="M5 5.5A1.5 1.5 0 0 1 6.5 4h5A1.5 1.5 0 0 1 13 5.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5z"
        ></path>
        <path
          fill="url(#SVGXfnBtcsf)"
          d="M5 5.5A1.5 1.5 0 0 1 6.5 4h5A1.5 1.5 0 0 1 13 5.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5z"
        ></path>
        <path
          fill="url(#SVGMXwVOewg)"
          d="M3 3.5A1.5 1.5 0 0 1 4.5 2h5A1.5 1.5 0 0 1 11 3.5v7A1.5 1.5 0 0 1 9.5 12h-5A1.5 1.5 0 0 1 3 10.5z"
        ></path>
        <path
          fill="url(#SVG99vZPbgO)"
          d="M3.5 5A1.5 1.5 0 0 0 2 6.5V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5a1.5 1.5 0 0 0-1.5-1.5h-1.586a.5.5 0 0 1-.353-.146L6.146 5.439A1.5 1.5 0 0 0 5.086 5z"
        ></path>
        <defs>
          <linearGradient
            id="SVGVtEbfDgM"
            x1={14.2}
            x2={15.247}
            y1={13.539}
            y2={5.069}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#bb45ea"></stop>
            <stop offset={1} stopColor="#9c6cfe"></stop>
          </linearGradient>
          <linearGradient
            id="SVGXfnBtcsf"
            x1={13}
            x2={11}
            y1={6.769}
            y2={6.769}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.338} stopColor="#5750e2" stopOpacity={0}></stop>
            <stop offset={1} stopColor="#5750e2"></stop>
          </linearGradient>
          <linearGradient
            id="SVG99vZPbgO"
            x1={4.571}
            x2={4.571}
            y1={5}
            y2={17.273}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.241} stopColor="#ffd638"></stop>
            <stop offset={0.637} stopColor="#fab500"></stop>
            <stop offset={0.985} stopColor="#ca6407"></stop>
          </linearGradient>
          <radialGradient
            id="SVGMXwVOewg"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(5.2 -7.66667 11.90405 8.07405 5.4 10)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.228} stopColor="#2764e7"></stop>
            <stop offset={0.685} stopColor="#5cd1ff"></stop>
            <stop offset={1} stopColor="#6ce0ff"></stop>
          </radialGradient>
        </defs>
      </g>
    </svg>
  );
}
