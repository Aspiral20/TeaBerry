import React, { FC } from 'react';
import cn from "classnames";
import { DefaultCnPropsType } from "../../_types";
import ContentLoader from "../content_loader";

interface DefaultContainerProps {
  children: React.ReactNode
  className?: string
  cnProps?: DefaultCnPropsType
  onClick?: (e?: any) => void
  isLoading?: boolean
}

const DefaultContainer: FC<DefaultContainerProps> = ({
  children,
  className = '',
  cnProps,
  onClick,
  isLoading = false
}) => {
  return (
    <div className={cn(`default_container ${className}`, cnProps)} onClick={onClick}>
      {!isLoading ? (
        <>{children}</>
      ) : <ContentLoader/>}
    </div>
  );
};

export default DefaultContainer;