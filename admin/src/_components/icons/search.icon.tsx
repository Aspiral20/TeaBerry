import React, { FC } from 'react';

const SearchIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={"search_icon " + className}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(1 1)"
      >
        <circle
          cx="7.5"
          cy="7.5" 
          r="7.5"
        />
        <path d="M18 18l-5.2-5.2"/>
      </g>
    </svg>
  );
};

export default SearchIcon;