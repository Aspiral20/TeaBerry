import React, { FC } from 'react';

const ArrowIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={'arrow_icon ' + className}
      {...rest}
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          d="m231.26 280 15.926 18.375 179.2 207.2 42.352-36.75-163.27-188.82 163.27-188.82-42.352-36.75-179.2 207.2z"/>
        <use x="70" y="644" xlinkHref="#u"/>
        <use x="90.550781" y="644" xlinkHref="#c"/>
        <use x="104.359375" y="644" xlinkHref="#a"/>
        <use x="123.347656" y="644" xlinkHref="#g"/>
        <use x="142.242188" y="644" xlinkHref="#b"/>
        <use x="155.628906" y="644" xlinkHref="#a"/>
        <use x="174.617188" y="644" xlinkHref="#i"/>
        <use x="204.410156" y="644" xlinkHref="#h"/>
        <use x="224.453125" y="644" xlinkHref="#f"/>
        <use x="252.453125" y="644" xlinkHref="#e"/>
        <use x="271.578125" y="644" xlinkHref="#g"/>
        <use x="290.472656" y="644" xlinkHref="#t"/>
        <use x="310.515625" y="644" xlinkHref="#s"/>
        <use x="320.113281" y="644" xlinkHref="#a"/>
        <use x="348.851562" y="644" xlinkHref="#e"/>
        <use x="367.976562" y="644" xlinkHref="#f"/>
        <use x="386.230469" y="644" xlinkHref="#a"/>
        <use x="70" y="672" xlinkHref="#r"/>
        <use x="82.183594" y="672" xlinkHref="#c"/>
        <use x="95.992188" y="672" xlinkHref="#d"/>
        <use x="115.226562" y="672" xlinkHref="#q"/>
        <use x="154.152344" y="672" xlinkHref="#b"/>
        <use x="167.535156" y="672" xlinkHref="#p"/>
        <use x="187.46875" y="672" xlinkHref="#a"/>
        <use x="216.207031" y="672" xlinkHref="#o"/>
        <use x="239.640625" y="672" xlinkHref="#d"/>
        <use x="258.878906" y="672" xlinkHref="#n"/>
        <use x="278.8125" y="672" xlinkHref="#m"/>
        <use x="308.492188" y="672" xlinkHref="#l"/>
        <use x="329.015625" y="672" xlinkHref="#c"/>
        <use x="342.820312" y="672" xlinkHref="#d"/>
        <use x="362.058594" y="672" xlinkHref="#k"/>
        <use x="371.65625" y="672" xlinkHref="#a"/>
        <use x="390.648438" y="672" xlinkHref="#j"/>
        <use x="407.242188" y="672" xlinkHref="#b"/>
      </g>
    </svg>
  );
};

export default ArrowIcon;