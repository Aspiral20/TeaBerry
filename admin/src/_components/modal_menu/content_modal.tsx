import React, { FC } from 'react';
import cn from "classnames";

interface ContentModalProps {
  className?: string
  children?: React.ReactNode
}

const ContentModal: FC<ContentModalProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={cn("content_modal " + className)} {...props}>
      {children}
    </div>
  );
};

export default ContentModal;