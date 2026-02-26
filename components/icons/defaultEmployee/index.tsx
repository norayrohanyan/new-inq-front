import React from "react";

interface DefaultEmployeeProps {
  width?: number;
  height?: number;
  className?: string;
}

const DefaultEmployeeIcon: React.FC<DefaultEmployeeProps> = ({
  width = 92,
  height = 92,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 92 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <rect width="92" height="92" rx="46" fill="url(#pattern0_4058_866)" />
    <defs>
      <pattern id="pattern0_4058_866" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_4058_866" transform="scale(0.00195312)" />
      </pattern>
      <image id="image0_4058_866" width="512" height="512" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAATr1AAE69QGXCHZXAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzt3XeUXHX9..." />
    </defs>
  </svg>
);

export default DefaultEmployeeIcon;
