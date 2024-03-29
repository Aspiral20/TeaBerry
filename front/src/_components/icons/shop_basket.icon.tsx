import React, { FC } from 'react';

const ShopBasketIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={"shop_basket_icon " + className}
      width="50px"
      height="50px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g id="shopping-basket-Filled">
        <path id="shopping-basket-Filled-2" data-name="shopping-basket-Filled" d="M19.75,13.17a.517.517,0,0,0-.38-.17H4.63a.517.517,0,0,0-.38.17.562.562,0,0,0-.12.4l.71,5.38A3.513,3.513,0,0,0,8.31,22h7.4a3.508,3.508,0,0,0,3.48-3.06l.68-5.38A.551.551,0,0,0,19.75,13.17ZM11,18a1,1,0,0,1-2,0V16a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V16a1,1,0,0,1,2,0Zm7-8.75a2.25,2.25,0,0,1-2.25,2.25H4.25a2.25,2.25,0,0,1,0-4.5H6.434L9.143,2.485a1,1,0,0,1,1.714,1.03L8.766,7h6.468L13.143,3.515a1,1,0,1,1,1.714-1.03L17.566,7H19.75A2.25,2.25,0,0,1,22,9.25Z"/>
      </g>
</svg>
);
};

export default ShopBasketIcon;