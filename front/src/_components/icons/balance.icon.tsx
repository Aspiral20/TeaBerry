import React, { FC } from 'react';

const BalanceIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={'balance_icon ' + className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="50px"
      height="50px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...rest}
    >
      <path d="M414.016,431.104c0-9.406-9.406-74.453-13.172-121.484c-3.156-39.406-24.453-77.109-60.203-99.688H171.344
		c-35.734,22.578-57.047,60.281-60.203,99.688c-3.75,47.031-13.156,112.078-13.156,121.484s-28.219,30.094-28.219,47.031
		c0,16.922,15.047,33.859,48.906,33.859s135.438,0,135.438,0h3.766c0,0,101.594,0,135.453,0c33.844,0,48.906-16.938,48.906-33.859
		C442.234,461.197,414.016,440.51,414.016,431.104z M306.156,412.104c-2.813,5.25-6.656,9.641-11.531,13.234
		c-4.891,3.578-10.75,6.234-17.547,8c-2.984,0.75-6.094,1.281-9.266,1.703v19.813h-23.641v-19.438
		c-6.734-0.563-13.172-1.594-19.234-3.281c-9.25-2.531-21.375-12.766-21.375-12.766c-1.047-0.594-1.719-1.656-1.875-2.859
		c-0.141-1.172,0.25-2.375,1.109-3.219l11.844-11.859c1.281-1.266,3.266-1.5,4.797-0.547c0,0,8.875,7.688,15.594,9.531
		c6.719,1.828,13.391,2.734,20.031,2.734c8.391,0,15.328-1.484,20.828-4.438c5.5-3,8.25-7.594,8.25-13.906
		c0-4.531-1.344-8.125-4.063-10.75c-2.719-2.594-7.281-4.25-13.75-4.969l-21.234-1.828c-12.563-1.219-22.25-4.719-29.063-10.469
		c-6.828-5.766-10.219-14.516-10.219-26.188c0-6.469,1.297-12.234,3.938-17.297c2.625-5.063,6.188-9.344,10.734-12.844
		c4.531-3.484,9.828-6.109,15.859-7.859c2.516-0.719,5.156-1.203,7.828-1.625V283.9h23.641v16.734
		c5.531,0.531,10.781,1.422,15.672,2.766c8.297,2.25,17.016,9.078,17.016,9.078c1.078,0.563,1.828,1.625,2.016,2.844
		s-0.219,2.438-1.078,3.328l-11.109,11.281c-1.188,1.203-3.016,1.516-4.531,0.719c0,0-6.578-4.688-12.266-6.156
		c-5.688-1.484-11.656-2.234-17.938-2.234c-8.219,0-14.297,1.563-18.203,4.703c-3.938,3.156-5.891,7.266-5.891,12.313
		c0,4.563,1.375,8.047,4.188,10.469c2.781,2.469,7.5,4.047,14.141,4.734l18.594,1.578c13.797,1.219,24.234,4.875,31.313,10.984
		c7.078,6.125,10.609,15.031,10.609,26.719C310.344,400.775,308.938,406.869,306.156,412.104z"
      />
      <path d="M346.297,36.463c-24.797-24.297-66.078-19.906-88.234-15.234l9.547,22.828
		c2.547,6.125-0.328,13.141-6.438,15.703c-6.109,2.547-13.141-0.328-15.688-6.438L223.344,0.385
		c-68.281-5.047-75.984,41.969-75.984,41.969l35.266,82.516H331.25C331.25,124.869,351.938,53.4,346.297,36.463z"
      />
      <path d="M425.469,195.807l-35.359-19.031l-26.547,22.047l46.734,25.156c7.781,4.188,17.484,1.281,21.672-6.5
		S433.234,199.994,425.469,195.807z"
      />
      <path d="M346.328,181.947H179.266c-8.844,0-16-7.156-16-16c0-8.828,7.156-16,16-16h155.5l66.219-55.031
		c6.781-5.656,16.875-4.719,22.531,2.078c5.641,6.797,4.719,16.891-2.078,22.531L346.328,181.947z"
      />
    </svg>
  );
};

export default BalanceIcon;