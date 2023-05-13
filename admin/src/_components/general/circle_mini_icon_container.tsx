import React, { FC } from 'react';
import cn from "classnames";
import { DefaultObjectItemType } from "../../_types/general";

interface CircleMiniIconContainerProps {
  className?: string,
  children?: React.ReactNode
  cnProps?: DefaultObjectItemType
  onClick?: () => void
}

const CircleMiniIconContainer: FC<CircleMiniIconContainerProps> = ({
  className,
  children,
  cnProps,
  onClick,
}) => {
  return (
    <label className={cn("circle_mini_icon_container " + className, {...cnProps})} onClick={onClick}>
      {children}
    </label>
  );
};

export default CircleMiniIconContainer;