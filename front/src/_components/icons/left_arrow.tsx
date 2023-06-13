import React, { FC } from 'react';

const LeftArrow: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={'left_arrow ' + className}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 20.018 18"
      {...rest}
    >
      <polygon points="10.018 18 10.018 13 20.018 13 20.018 5 10.018 5 10.018 0 0 8.939 10.018 18"/>
    </svg>
  );
};

export default LeftArrow;