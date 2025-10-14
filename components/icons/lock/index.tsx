export const LockIcon = ({
  width = "24",
  height = "24",
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="11"
        rx="2"
        stroke="url(#paint0_linear_lock)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
        stroke="url(#paint1_linear_lock)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="16"
        r="1"
        fill="url(#paint2_linear_lock)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_lock"
          x1="5"
          y1="11"
          x2="19.833"
          y2="11.917"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6572F" />
          <stop offset="0.495" stopColor="#FE7F3B" />
          <stop offset="1" stopColor="#FEB245" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_lock"
          x1="7"
          y1="2"
          x2="17.833"
          y2="2.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6572F" />
          <stop offset="0.495" stopColor="#FE7F3B" />
          <stop offset="1" stopColor="#FEB245" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_lock"
          x1="11"
          y1="15"
          x2="13"
          y2="17"
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

