import React, { FC } from 'react';

interface ContainerProps {
  className?: string
  children?: React.ReactNode
}

const Container: FC<ContainerProps> = ({
  children,
  className= ''
}) => {
  return (
    <div className={'container ' + className}>
      {children}
    </div>
  );
};

export default Container;