import React, { FC } from 'react';

interface FonProps {
  children: React.ReactNode
  className?: string
}

const Fon: FC<FonProps> = ({children, className = ''}) => {
  return (
    <div className={"fon " + className}>
      {children}
    </div>
  );
};

export default Fon;