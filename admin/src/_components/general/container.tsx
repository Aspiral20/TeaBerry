import React, { FC } from 'react';
import { DefaultObjectItemType } from "../../_types/general";

interface ContainerProps {
  className?: string
  children?: React.ReactNode
  refContainer?: React.RefObject<HTMLDivElement>
  styleContainer?: DefaultObjectItemType
}

const Container: FC<ContainerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
  className = '',
  refContainer= null,
  styleContainer= {},
  ...props
}) => {
  return (
    <div className={'container ' + className} ref={refContainer} style={styleContainer} {...props}>
      {children}
    </div>
  );
};

export default Container;