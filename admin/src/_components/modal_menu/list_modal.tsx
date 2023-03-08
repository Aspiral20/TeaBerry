import React, { FC } from 'react';
import cn from "classnames";

interface ListModalProps {
  className?: string
  children?: React.ReactNode
}

const ListModal: FC<ListModalProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={cn("list_modal " + className)} {...props}>
      {children}
    </div>
  );
};

export default ListModal;