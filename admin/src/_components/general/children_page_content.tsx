import React, { FC } from 'react';
import { DefaultChildrenType } from "../../_types/general";
import cn from "classnames";

interface ChildrenPageContentProps {
  className?: string
}

const ChildrenPageContent: FC<ChildrenPageContentProps & DefaultChildrenType> = ({
  children,
  className
}) => {
  return (
    <div className={cn("children_page_content " + className)}>
      {children}
    </div>
  );
};

export default ChildrenPageContent;