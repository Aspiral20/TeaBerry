import React, { FC } from 'react';

interface MenuModalProps {
  direction?: string
  children: React.ReactNode
}

const MenuModal: FC<MenuModalProps> = ({
  direction= 'left',
  children
}) => {
  return (
      <div className={"menu_modal " + direction}>
        {children}
      </div>
  );
};

export default MenuModal;