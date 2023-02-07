import React, { FC } from 'react';

const Check: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={"check_icon " + className}
      {...rest}
      height="50px"
      width="50px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 17.837 17.837"
      xmlSpace="preserve"
    >
      <g>
        <path d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
		c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
		L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
      </g>
    </svg>
  );
};

export default Check;