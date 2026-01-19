interface ArrowIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'fill' | 'rotate'> {
  fill?: string;
  rotate?: boolean;
}

export const ArrowIcon = ({
  width = "49",
  height = "46",
  className,
  fill = "white",
  rotate = false,
  ...props
}: ArrowIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: rotate ? 'rotate(180deg)' : 'none', ...props.style }}
      {...props}
    >
      <g style={{ mixBlendMode: 'soft-light' }}>
        <path
          d="M26 3.25L45.5 22.9074L26 42.5647M42.7917 22.9074L3.25 22.9074"
          stroke={fill}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
