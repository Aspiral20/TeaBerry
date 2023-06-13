import React, { FC } from 'react';
import cn from "classnames";
import { DefaultCnPropsType, DefaultObjectItemType } from "../../_types";

interface SvgButtonProps {
  svgIcon: React.ReactNode
  className?: string
  cnProps?: DefaultCnPropsType
  isAnimated?: boolean
  onClick?: () => void
}

const SvgButton: FC<SvgButtonProps> = ({
  svgIcon,
  className = '',
  onClick,
  cnProps,
  isAnimated,
  ...rest
}) => {
  return (
    <div
      className={cn(`svg_button ${className}`, {
        is_animated: isAnimated,
        ...cnProps
      })}
      onClick={onClick}
      {...rest}
    >
      <div className={cn("animation_1")}/>
      <div className={cn("animation_2")}/>
      {svgIcon}
    </div>
  );
};

export default SvgButton;