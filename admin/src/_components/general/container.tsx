import React, { FC } from 'react';

interface ContainerProps {
  className?: string
  children?: React.ReactNode
}

const Container: FC<ContainerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={'container ' + className} {...props}>
      {children}
    </div>
  );
};

export default Container;