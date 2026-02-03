import type { SVGProps } from "react";

export function ListDetailVector(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#SVG1UsBqcNm)"
          fillRule="evenodd"
          d="M9 5a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
        <path
          fill="url(#SVGKboikK4R)"
          d="M3.5 4A1.5 1.5 0 0 0 2 5.5v2A1.5 1.5 0 0 0 3.5 9h2A1.5 1.5 0 0 0 7 7.5v-2A1.5 1.5 0 0 0 5.5 4zm0 7A1.5 1.5 0 0 0 2 12.5v2A1.5 1.5 0 0 0 3.5 16h2A1.5 1.5 0 0 0 7 14.5v-2A1.5 1.5 0 0 0 5.5 11z"
        ></path>
        <defs>
          <linearGradient
            id="SVG1UsBqcNm"
            x1={7.65}
            x2={17.1}
            y1={2.286}
            y2={16}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#36dff1"></stop>
            <stop offset={1} stopColor="#0094f0"></stop>
          </linearGradient>
          <linearGradient
            id="SVGKboikK4R"
            x1={3.189}
            x2={5.737}
            y1={5.595}
            y2={15.361}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.125} stopColor="#9c6cfe"></stop>
            <stop offset={1} stopColor="#7a41dc"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
