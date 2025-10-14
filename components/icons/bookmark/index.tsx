export const BookmarkIcon = ({
  width = "10",
  height = "12",
  className,
  fill = "url(#paint0_linear_238_2614)",
  active = true,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  fill?: string;
  active?: boolean;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {active ? (
        // Filled version (active)
        <path
          d="M0.5 12V1.33333C0.5 0.966667 0.630667 0.652889 0.892 0.392C1.15333 0.131111 1.46711 0.000444444 1.83333 0H8.5C8.86667 0 9.18067 0.130667 9.442 0.392C9.70333 0.653333 9.83378 0.967111 9.83333 1.33333V12L5.16667 10L0.5 12Z"
          fill={fill}
        />
      ) : (
        // Outline version (inactive) - stroke with gradient
        <path
          d="M1.83333 0.5H8.5C8.73869 0.5 8.96761 0.594821 9.13639 0.763604C9.30518 0.932387 9.4 1.16131 9.4 1.4V11.3L5.16667 9.5L0.933333 11.3V1.4C0.933333 1.16131 1.02816 0.932387 1.19694 0.763604C1.36572 0.594821 1.59464 0.5 1.83333 0.5Z"
          fill="none"
          stroke={fill}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <defs>
        <linearGradient
          id="paint0_linear_238_2614"
          x1="9.8"
          y1="-3.66951e-07"
          x2="12.0048"
          y2="9.36091"
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
