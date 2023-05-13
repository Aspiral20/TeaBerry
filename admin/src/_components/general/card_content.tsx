import React, { FC } from 'react';
import cn from "classnames";

interface CardContentProps {
  children: React.ReactNode
  isLoading?: boolean
  className?: string
  onClick?: () => void
}

const CardContent: FC<CardContentProps> = ({
  children,
  isLoading,
  className,
  onClick
}) => {
  return (
    <div className={cn("card_content fon text " + className)} onClick={onClick}>
      {!isLoading ? (
        <>{ children }</>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default CardContent;