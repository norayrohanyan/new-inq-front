export const ErrorIcon = ({ 
  width = 80, 
  height = 80, 
  color = '#FF5C5C' 
}: { 
  width?: number; 
  height?: number; 
  color?: string 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="40"
      cy="40"
      r="36"
      stroke={color}
      strokeWidth="6"
      fill="none"
    />
    <path
      d="M40 25V45"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <circle
      cx="40"
      cy="55"
      r="3"
      fill={color}
    />
  </svg>
);
