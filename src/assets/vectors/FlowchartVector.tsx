import React from "react";
import type { SVGProps } from "react";

export function FlowchartVector(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="#fff"
          d="M16.09 7.705L12 9.955l-4.09-2.25V3.103L12 .751l4.09 2.352zM8.932 20.999l-4.09 2.25l-4.09-2.25v-4.602l4.09-2.352l4.09 2.352zm14.317 0l-4.09 2.25l-4.091-2.25v-4.602l4.09-2.352l4.09 2.352z"
        ></path>
        <path
          fill="#bbd8ff"
          d="m.751 20.897l1.534-.716l2.557 1.534l2.556-1.534l1.534.818l-4.09 2.25zm14.317 0l1.534-.716l2.556 1.534l2.557-1.534l1.534.818l-4.09 2.25zM7.91 7.603l1.533-.716L12 8.421l2.556-1.534l1.534.818L12 9.955z"
        ></path>
        <path
          stroke="#092f63"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M16.09 7.705L12 9.955l-4.09-2.25V3.103L12 .751l4.09 2.352zM8.932 20.999l-4.09 2.25l-4.09-2.25v-4.602l4.09-2.352l4.09 2.352zm14.317 0l-4.09 2.25l-4.091-2.25v-4.602l4.09-2.352l4.09 2.352zm-5.829-5.931L13.943 8.83m-5.011 9.306h6.136M10.057 8.83L6.58 15.068"
          strokeWidth={1}
        ></path>
      </g>
    </svg>
  );
}
