export const AmdIcon = ({
  width = "14",
  height = "14",
  className,
  fill = "url(#paint0_linear_3803_7144)",
  ...props
}: React.SVGProps<SVGSVGElement> & {
  fill?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 2C4.57174 2 3.6815 2.36875 3.02513 3.02513C2.36875 3.6815 2 4.57174 2 5.5C2 6.05228 1.55228 6.5 1 6.5C0.447715 6.5 0 6.05228 0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5V6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H11V9H13C13.5523 9 14 9.44771 14 10C14 10.5523 13.5523 11 13 11H11V13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13V11H7C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9H9V8H7C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6H9V5.5C9 4.57174 8.63125 3.6815 7.97487 3.02513C7.3185 2.36875 6.42826 2 5.5 2Z"
        fill={fill}
      />
      <defs>
        <linearGradient id="paint0_linear_3803_7144" x1="0" y1="0" x2="14.5996" y2="0.656051" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6572F"/>
          <stop offset="0.495" stopColor="#FE7F3B"/>
          <stop offset="1" stopColor="#FEB245"/>
        </linearGradient>
      </defs>
    </svg>
  );
};
