import React, { FC } from 'react';
import { LinkCardPaper, PageContainer, SiteList, TitlePage } from "../_components";
import ChildrenPageContent from "../_components/general/children_page_content";
import CatalogIcon from "../_components/icons/catalog.icon";
import { v4 as uuid } from 'uuid';

interface CommerceProps {
}

const paperData = [
  {
    id: uuid(),
    to: '/commerce/catalog',
    headerTitle: 'Catalog',
    headerDescription: 'TeaBerry catalog',
    SVGIcon: <CatalogIcon/>,
    rightContent: <SiteList data={['Users', 'Products', 'Statistics']}/>
  }
]

const chapterData = [
  { id: uuid(), to: '/', name: 'Home' },
]

const Commerce: FC<CommerceProps> = ({}) => {
  return (
    <PageContainer className="commerce">

      <TitlePage
        title="Commerce"
        data={chapterData}
        className="commerce_title"
        classNames={{
          titleChapter: 'commerce_chapter_title',
          descriptionChapter: 'commerce_path'
        }}
      />

      <ChildrenPageContent>
        {paperData.map(({ id, to, headerTitle, headerDescription, SVGIcon, rightContent }) => (
          <LinkCardPaper
            key={id}
            to={to}
            headerTitle={headerTitle}
            headerDescription={headerDescription}
            SVGIcon={SVGIcon}
            rightContent={rightContent}
          />
        ))}
      </ChildrenPageContent>
    </PageContainer>
  );
};

export default Commerce;