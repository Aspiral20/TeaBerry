import React, { FC } from 'react';
import cn from "classnames";
import { DefaultCnPropsType } from "../_types";
import { LeftArrow } from "./icons";
import { Link, useLocation } from "react-router-dom";

interface BackToPreviousProps {
  className?: string
  cnProps?: DefaultCnPropsType
  children?: React.ReactNode
  to?: string
}

const BackToPrevious: FC<BackToPreviousProps> = ({
  className = '',
  cnProps,
  children,
  to
}) => {
  const { pathname } = useLocation()

  return (
    <Link to={to ? to : pathname} className={cn(`back_to_previous ${className}`, cnProps)}>
      <div className="arrow_container">
        <LeftArrow/>
      </div>
      {children}
    </Link>
  );
};

export default BackToPrevious;