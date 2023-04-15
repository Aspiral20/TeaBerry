import React, { FC } from 'react';
import cn from "classnames";

interface XIconProps {
  xFunction?: () => void
  classNameAnimation?: boolean
}

const XCssIcon: FC<XIconProps> = ({ xFunction, classNameAnimation }) => {
  return (
    <div
      className={cn("x-icon-container", { 'current-card-icon-effect': classNameAnimation })}
      onClick={xFunction}
    >
      <div className="x-icon"/>
    </div>
  );
};

export default XCssIcon;