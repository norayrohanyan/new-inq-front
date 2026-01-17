export const StarIcon = ({
  width = "11",
  height = "10",
  className,
  fill = "#FEB245",
  filled = true,
  outlined = false,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  fill?: string;
  filled?: boolean;
  outlined?: boolean;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {filled && !outlined ? (
        <>
          <defs>
            <linearGradient id={`star-gradient-${width}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6572F" />
              <stop offset="50%" stopColor="#FE7F3B" />
              <stop offset="100%" stopColor="#FEB245" />
            </linearGradient>
          </defs>
          <path
            d="M2.01316 10L2.86842 6.30263L0 3.81579L3.78947 3.48684L5.26316 0L6.73684 3.48684L10.5263 3.81579L7.65789 6.30263L8.51316 10L5.26316 8.03947L2.01316 10Z"
            fill={`url(#star-gradient-${width})`}
          />
        </>
      ) : outlined ? (
        <path
          d="M2.01316 10L2.86842 6.30263L0 3.81579L3.78947 3.48684L5.26316 0L6.73684 3.48684L10.5263 3.81579L7.65789 6.30263L8.51316 10L5.26316 8.03947L2.01316 10Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      ) : (
        <path
          d="M2.01316 10L2.86842 6.30263L0 3.81579L3.78947 3.48684L5.26316 0L6.73684 3.48684L10.5263 3.81579L7.65789 6.30263L8.51316 10L5.26316 8.03947L2.01316 10Z"
          fill={fill}
        />
      )}
    </svg>
  );
};
