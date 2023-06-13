import React, { FC } from 'react';
import cn from "classnames";
import { DefaultObjectsItemType } from "../../_types";

interface FonProps {
  children: React.ReactNode
  className?: string
  id?: string
  refContainer?: React.RefObject<HTMLDivElement>
  cnOptions?: DefaultObjectsItemType
  style?: React.CSSProperties
}

const Fon: FC<FonProps> = ({
  className = "",
  id,
  refContainer,
  cnOptions,
  style,
  children,
}) => {
  return (
    <div id={id} className={cn("fon " + className, cnOptions)} style={style} ref={refContainer}>
      {children}
    </div>
  );
};

export default Fon;