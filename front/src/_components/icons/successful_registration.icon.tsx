import React, { FC } from 'react';

const SuccessfulRegistrationIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={"successful_registration " + className}
      {...rest}
      width={60}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <circle r="25" transform="translate(25 25)" fill="#25ae88"/>
      <polyline
        points="38,15 22,33 12,25"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default SuccessfulRegistrationIcon;