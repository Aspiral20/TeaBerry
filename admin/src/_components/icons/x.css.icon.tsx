import React, { FC } from 'react';
import cn from "classnames";

interface XIconProps {
  onClick?: () => void
  isActive?: boolean
}

const XCssIcon: FC<XIconProps> = ({ onClick, isActive }) => {
  return (
    <div
      className={cn("x-icon-container", { 'current-card-icon-effect': isActive })}
      onClick={onClick}
    >
      <div className="x-icon"/>
    </div>
  );
};

export default XCssIcon;