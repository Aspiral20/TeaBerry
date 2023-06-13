import React, { FC } from 'react';
import cn from "classnames";

interface ContainerProps {
  className?: string
  id?: string
  refContainer?: React.RefObject<HTMLDivElement>
  styleContainer?: React.CSSProperties
  disableContainer?: boolean
  children?: React.ReactNode
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  refContainer,
  styleContainer,
  disableContainer,
  id,
}) => {
  return (
    <div id={id} className={cn(className, { container: !disableContainer })} ref={refContainer} style={styleContainer}>
      {children}
    </div>
  );
};

export default Container;