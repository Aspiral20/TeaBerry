import React, { FC } from 'react';
import cn from "classnames";

interface HelpRightModalProps {
  isActive: boolean
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
}

// todo help right modal
const HelpRightModal: FC<HelpRightModalProps> = ({
  children,
  isActive,
  toggleMenu
}) => {
  return (
    <>
      <div className={cn("help_right_modal_fon", { active: isActive })} onClick={() => toggleMenu(false)}/>
      <div className={cn('help_right_modal', { active: isActive })}>
        {children}
      </div>
    </>
  );
};

export default HelpRightModal;