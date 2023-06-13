import React, { FC } from 'react';
import cn from "classnames";
import { DefaultCnPropsType } from "../../_types";
import { BurgerAdaptive } from "../index";
import { observer } from "mobx-react-lite";

interface DefaultModalProps {
  className?: string
  cnProps?: DefaultCnPropsType
  direction?: string
  children: React.ReactNode
  isOpen: boolean
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>
  setToggleFunc?: () => void
}

const DefaultModal: FC<DefaultModalProps> = ({
  className = "",
  setToggle,
  cnProps,
  direction,
  children,
  isOpen,
  setToggleFunc,
}) => {

  const setFunction = () => {
    if (setToggle) {
      setToggle(false)
    }
    if (setToggleFunc) {
      setToggleFunc()
    }
  }

  return (
    <div className="default_modal_container">
      <div
        className={cn(`default_modal ${className}`, {
          [direction ? direction : ""]: !!direction,
          isOpen: isOpen,
          ...cnProps
        })}
      >
        <BurgerAdaptive classNameAnimation={isOpen} onClick={setFunction}/>
        {children}
      </div>
      <div className={cn("fon", { active: isOpen })} onClick={setFunction}/>
    </div>
  );
};

export default observer(DefaultModal);