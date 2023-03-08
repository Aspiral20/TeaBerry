import React, { FC, HTMLAttributes } from 'react';

interface TitleChapterProps {
  className?: string
  children?: React.ReactNode
}

const TitleChapter: FC<TitleChapterProps & HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={"title_chapter " + className} {...props}>
      {children}
    </div>
  );
};

export default TitleChapter;