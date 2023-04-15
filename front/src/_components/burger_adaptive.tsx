import React, { FC } from 'react';
import cn from "classnames";
import { XCssIcon } from "./icons";

interface BurgerAdaptiveProps {
  onClick?: () => void
  classNameAnimation?: boolean
}

const BurgerAdaptive: FC<BurgerAdaptiveProps> = ({ onClick, classNameAnimation }) => {
  return (
    <div
      className="burger"
      onClick={onClick}
    >
      <div className={cn('burger_animate_bar', { active: classNameAnimation })}>
        <div className="burger_center"/>
      </div>
      <XCssIcon classNameAnimation={classNameAnimation}/>
    </div>
  );
};

export default BurgerAdaptive;