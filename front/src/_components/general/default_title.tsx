import React, { FC } from 'react';
import cn from "classnames";

interface DefaultTitleProps {
  className?: string
  center?: boolean
  children?: React.ReactNode
}

const DefaultTitle: FC<DefaultTitleProps> = ({
  className = '',
  center,
  children
}) => {
  return (
    <h2 className={cn(`${className} title`, { center: center })}>
      {children}
    </h2>
  );
};

export default DefaultTitle;