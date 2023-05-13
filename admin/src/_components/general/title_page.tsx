import React, { FC } from 'react';
import { DescriptionChapter, TitleChapter } from "./index";
import cn from "classnames";

interface TitlePageProps {
  title: string,
  classNames: { titleChapter?: string, descriptionChapter?: string }
  className?: string
  data?: Array<{ id: string, to: string, name: string }>
}

const TitlePage: FC<TitlePageProps> = ({
  classNames,
  className,
  title,
  data,
}) => {
  const { titleChapter, descriptionChapter } = classNames

  return (
    <div className={cn("title_container " + className)}>
      <TitleChapter className={titleChapter}>{title}</TitleChapter>
      <DescriptionChapter className={descriptionChapter} data={data}/>
    </div>
  );
};

export default TitlePage;