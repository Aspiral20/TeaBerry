import React, { FC, HTMLAttributes } from 'react';

interface DescriptionChapterProps {
  className?: string
  children?: React.ReactNode
}

const DescriptionChapter: FC<DescriptionChapterProps & HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={"description_chapter " + className} {...props}>
      {children}
    </div>
  );
};

export default DescriptionChapter;