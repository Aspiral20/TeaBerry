import React, { FC, HTMLAttributes } from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";

interface ListItemProps {
  className?: string
  cnParams?: { [p: string]: boolean }
  children?: React.ReactNode
  linkTo?: string
}

const ListItem: FC<ListItemProps & HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  cnParams,
  children,
  linkTo,
  ...props
}) => {
  return (
    linkTo ? (
      <Link to={linkTo} className={cn("list_item " + className, { ...cnParams })}>
        {children}
      </Link>
    ) : (
      <div className={cn("list_item " + className, { ...cnParams })} {...props}>
        {children}
      </div>
    )
  );
};

export default ListItem;