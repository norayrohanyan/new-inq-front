export const YoutubeIcon = ({ width = 12, height = 12 }: { width?: number; height?: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7 1.56C13.5 0.78 12.9 0.18 12.12 0C11.06 -0.24 7 -0.24 7 -0.24C7 -0.24 2.94 -0.24 1.88 0C1.1 0.18 0.5 0.78 0.3 1.56C0.06 2.62 0.06 4.84 0.06 4.84C0.06 4.84 0.06 7.06 0.3 8.12C0.5 8.9 1.1 9.5 1.88 9.68C2.94 9.92 7 9.92 7 9.92C7 9.92 11.06 9.92 12.12 9.68C12.9 9.5 13.5 8.9 13.7 8.12C13.94 7.06 13.94 4.84 13.94 4.84C13.94 4.84 13.94 2.62 13.7 1.56ZM5.6 7.06V2.62L9.24 4.84L5.6 7.06Z"
        fill="url(#paint0_linear_youtube)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_youtube"
          x1="0.06"
          y1="-0.24"
          x2="14.5646"
          y2="0.41776"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6572F" />
          <stop offset="0.495" stopColor="#FE7F3B" />
          <stop offset="1" stopColor="#FEB245" />
        </linearGradient>
      </defs>
    </svg>
  );
};
