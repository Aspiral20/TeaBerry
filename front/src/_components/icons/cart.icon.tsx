import React, { FC } from 'react';
import { paramsSvg } from "../../_utils";

const CartIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {

  return (
    <svg
      className={'cart_icon ' + className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="50"
      height="50"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
      {...rest}
    >
      <g
        {...paramsSvg({})}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 77.943 62.571 H 24.255 c -1.379 0 -2.571 -0.959 -2.866 -2.305 l -8.043 -36.651 c -0.191 -0.868 0.022 -1.776 0.579 -2.469 c 0.557 -0.693 1.398 -1.095 2.287 -1.095 h 70.854 c 0.834 0 1.629 0.355 2.186 0.976 c 0.556 0.621 0.823 1.45 0.732 2.279 l -3.359 30.607 C 86.082 58.849 82.907 62.571 77.943 62.571 z"
          {...paramsSvg({
            strokeWidth: "1",
            fill: "rgb(0,0,0)"
          })}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <circle
          cx="33.718" cy="73.438" r="6.848"
          {...paramsSvg({
            strokeWidth: "1",
            strokeLinecap: "round",
            fill: "rgb(0,0,0)"
          })}
          transform="  matrix(1 0 0 1 0 0) "
        />
        <circle
          cx="70.928" cy="73.438" r="6.848"
          {...paramsSvg({
            strokeWidth: "1",
            fill: "rgb(0,0,0)"
          })}
          transform="  matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 16.209 25.922 c -1.348 0 -2.563 -0.935 -2.864 -2.306 l -0.542 -2.467 c -0.708 -3.225 -3.617 -5.565 -6.919 -5.565 h -2.95 C 1.314 15.583 0 14.269 0 12.649 s 1.314 -2.935 2.935 -2.935 h 2.95 c 6.037 0 11.357 4.28 12.651 10.176 l 0.542 2.467 c 0.348 1.583 -0.654 3.148 -2.237 3.496 C 16.629 25.9 16.417 25.922 16.209 25.922 z"
          {...paramsSvg({
            strokeWidth: "1",
            fill: "rgb(0,0,0)"
          })}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 61.166 73.837 c -0.005 -0.133 -0.02 -0.264 -0.02 -0.398 c 0 -2.025 0.619 -3.908 1.677 -5.471 H 41.825 c 1.058 1.563 1.677 3.446 1.677 5.471 c 0 0.134 -0.015 0.265 -0.02 0.398 H 61.166 z"
          {...paramsSvg({
            strokeWidth: "1",
            strokeLinecap: "round",
            fill: "rgb(0,0,0)"
          })}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 23.937 73.438 c 0 -2.036 0.626 -3.927 1.695 -5.495 c -1.377 -0.121 -2.464 -1.267 -2.464 -2.674 c 0 -1.487 1.21 -2.698 2.698 -2.698 c 1.621 0 2.935 -1.314 2.935 -2.935 c 0 -1.621 -1.314 -2.935 -2.935 -2.935 c -4.725 0 -8.568 3.843 -8.568 8.567 c 0 4.063 2.846 7.468 6.648 8.343 C 23.945 73.554 23.937 73.497 23.937 73.438 z"
          {...paramsSvg({
            strokeWidth: "1",
            strokeLinecap: "round",
            fill: "rgb(0,0,0)"
          })}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 84.903 70.902 L 84.903 70.902 c 0 -1.621 -1.314 -2.935 -2.935 -2.935 h -2.808 c 1.058 1.563 1.677 3.446 1.677 5.471 c 0 0.134 -0.015 0.265 -0.02 0.398 h 1.151 C 83.589 73.837 84.903 72.523 84.903 70.902 z"
          {...paramsSvg({
            strokeWidth: "1",
            strokeLinecap: "round",
            fill: "rgb(0,0,0)"
          })}
          transform=" matrix(1 0 0 1 0 0) "
        />
      </g>
    </svg>
  );
};

export default CartIcon;