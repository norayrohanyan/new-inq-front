import React from "react";

const DefaultCompanyIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 72,
  height = 58,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 72 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M49.25 56V8C49.25 6.4087 48.5388 4.88258 47.273 3.75736C46.0071 2.63214 44.2902 2 42.5 2H29C27.2098 2 25.4929 2.63214 24.227 3.75736C22.9612 4.88258 22.25 6.4087 22.25 8V56M8.75 14H62.75C66.4779 14 69.5 16.6863 69.5 20V50C69.5 53.3137 66.4779 56 62.75 56H8.75C5.02208 56 2 53.3137 2 50V20C2 16.6863 5.02208 14 8.75 14Z"
      stroke="url(#paint0_linear_4129_2)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4129_2"
        x1="2"
        y1="2"
        x2="72.3114"
        y2="5.9494"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F6572F" />
        <stop offset="0.495" stopColor="#FE7F3B" />
        <stop offset="1" stopColor="#FEB245" />
      </linearGradient>
    </defs>
  </svg>
);

export default DefaultCompanyIcon;
