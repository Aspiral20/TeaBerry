import React, { FC } from 'react';
import cn from "classnames";

interface PageContainerProps {
  className?: string
  children: React.ReactNode
}

const PageContainer: FC<PageContainerProps> = ({
  className,
  children
}) => {
  return (
    <div className={cn("page_container " + className)}>
      {children}
    </div>
  );
};

export default PageContainer;