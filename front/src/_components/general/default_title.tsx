import React, { FC } from 'react';

interface DefaultTitleProps {
  children?: React.ReactNode
  className?: string
}

const DefaultTitle: FC<DefaultTitleProps> = ({ className = '', children }) => {
  return (
    <h2 className={`${className} title`}>
      {children}
    </h2>
  );
};

export default DefaultTitle;