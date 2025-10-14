export const FilterIcon = ({
  width = "12",
  height = "12",
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4.61429 3.25781H11.4714M0.5 8.74353H7.35714"
        stroke="url(#paint0_linear_filter)"
        strokeLinecap="round"
      />
      <path
        d="M0.499972 3.25734C0.499972 4.39347 1.42099 5.31448 2.55711 5.31448C3.69324 5.31448 4.61426 4.39347 4.61426 3.25734C4.61426 2.12121 3.69324 1.2002 2.55711 1.2002C1.42099 1.2002 0.499972 2.12121 0.499972 3.25734Z"
        stroke="url(#paint1_linear_filter)"
        strokeLinecap="round"
      />
      <path
        d="M7.35642 8.74269C7.35642 9.87882 8.27743 10.7998 9.41356 10.7998C10.5497 10.7998 11.4707 9.87882 11.4707 8.74269C11.4707 7.60656 10.5497 6.68555 9.41356 6.68555C8.27743 6.68555 7.35642 7.60656 7.35642 8.74269Z"
        stroke="url(#paint2_linear_filter)"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_filter"
          x1="0.5"
          y1="3.25781"
          x2="11.8726"
          y2="4.27989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6572F" />
          <stop offset="0.495" stopColor="#FE7F3B" />
          <stop offset="1" stopColor="#FEB245" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_filter"
          x1="4.61426"
          y1="1.2002"
          x2="4.42146"
          y2="5.4907"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6572F" />
          <stop offset="0.495" stopColor="#FE7F3B" />
          <stop offset="1" stopColor="#FEB245" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_filter"
          x1="11.4707"
          y1="6.68555"
          x2="11.2779"
          y2="10.976"
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
