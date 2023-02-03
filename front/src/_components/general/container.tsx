import React, { FC } from 'react';

interface ContainerProps {
  className?: string
  children?: React.ReactNode
}

const Container: FC<ContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={`${className} container`}>
      {children}
    </div>
  );
};

export default Container;