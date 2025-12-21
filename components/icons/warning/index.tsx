export const WarningIcon = ({ 
  width = 80, 
  height = 80 
}: { 
  width?: number; 
  height?: number; 
}) => (
  <svg width={width} height={height} viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M57.9945 39.9043C55.2884 39.9043 53.5 42.1633 53.5 44.3988V71.4125C53.5 74.1186 55.2884 75.9072 57.9945 75.9072C60.7005 75.9072 62.4891 73.648 62.4891 71.4125V44.3988C62.4891 41.6927 60.7005 39.9043 57.9945 39.9043Z" fill="url(#paint0_linear_warning)"/>
    <path d="M57.9945 93.9088C60.4767 93.9088 62.4889 91.8966 62.4889 89.4144C62.4889 86.9322 60.4767 84.9199 57.9945 84.9199C55.5122 84.9199 53.5 86.9322 53.5 89.4144C53.5 91.8966 55.5122 93.9088 57.9945 93.9088Z" fill="url(#paint1_linear_warning)"/>
    <path d="M113.811 92.096L65.1951 13.3372C61.1477 7.03083 54.8414 7.03083 50.794 13.3372L2.20213 92.096C-2.73942 100.638 0.860855 107.391 10.7439 107.391H104.798C115.152 107.391 118.752 100.661 113.811 92.096ZM106.163 102.897H9.84976C4.90822 102.897 3.09632 99.2963 5.8024 95.249L55.312 15.1491C56.6533 12.443 59.3594 12.443 61.171 15.1491L110.681 95.249C112.916 99.2963 111.104 102.897 106.163 102.897Z" fill="url(#paint2_linear_warning)"/>
    <defs>
      <linearGradient id="paint0_linear_warning" x1="53.5" y1="39.9043" x2="62.8919" y2="40.0097" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6572F"/>
        <stop offset="0.495" stopColor="#FE7F3B"/>
        <stop offset="1" stopColor="#FEB245"/>
      </linearGradient>
      <linearGradient id="paint1_linear_warning" x1="53.5" y1="84.9199" x2="62.8739" y2="85.3411" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6572F"/>
        <stop offset="0.495" stopColor="#FE7F3B"/>
        <stop offset="1" stopColor="#FEB245"/>
      </linearGradient>
      <linearGradient id="paint2_linear_warning" x1="0" y1="8.60742" x2="120.876" y2="14.9858" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6572F"/>
        <stop offset="0.495" stopColor="#FE7F3B"/>
        <stop offset="1" stopColor="#FEB245"/>
      </linearGradient>
    </defs>
  </svg>
);
