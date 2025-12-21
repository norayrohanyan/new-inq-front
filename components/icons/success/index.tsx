export const SuccessIcon = ({ 
  width = 80, 
  height = 80, 
  color = '#FF8243' 
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
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M25 40L35 50L55 30"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


