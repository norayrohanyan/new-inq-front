import React from 'react';

interface ISquareIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

export const SquareIcon: React.FC<ISquareIconProps> = ({
  width = 16,
  height = 16,
  className,
  color = '#868686',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.06846 16C1.48867 16 0.998974 15.8002 0.599384 15.4006C0.199795 15.001 0 14.5113 0 13.9315V1.05065C0 0.596213 0.211547 0.278892 0.634642 0.0986848C1.05774 -0.0815222 1.42599 -0.014924 1.73939 0.29848L3.85486 2.41395L2.58558 3.68324L3.24373 4.34139L4.51301 3.0721L6.95756 5.51665L5.68828 6.78593L6.34642 7.44408L7.61571 6.1748L10.0603 8.61935L8.79097 9.88863L9.44912 10.5468L10.7184 9.27749L13.163 11.722L11.8937 12.9913L12.5518 13.6495L13.8211 12.3802L15.7015 14.2606C16.0149 14.574 16.0815 14.9423 15.9013 15.3654C15.7211 15.7885 15.4038 16 14.9494 16H2.06846ZM2.82063 13.1794H10.6244L2.82063 5.37562V13.1794Z"
        fill={color}
      />
    </svg>
  );
};
