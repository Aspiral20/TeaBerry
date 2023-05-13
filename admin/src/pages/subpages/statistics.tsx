import React, { FC } from 'react';
import { PageContainer, TitlePage } from "../../_components";
import { v4 as uuid } from 'uuid'

const chapterData = [
  { id: uuid(), to: '/', name: 'Home'},
  { id: uuid(), to: '/commerce', name: 'Commerce'},
  { id: uuid(), to: '/commerce/catalog', name: 'Catalog'},
]

interface StatisticsProps {}
const Statistics: FC<StatisticsProps> = ({}) => {
  return (
    <PageContainer className="statistics">

      <TitlePage
        title="Statistics"
        data={chapterData}
        className="statistics_title"
        classNames={{
          titleChapter: 'statistics_chapter_title',
          descriptionChapter: 'statistics_chapter_path'
        }}
      />

    </PageContainer>
  );
};

export default Statistics;