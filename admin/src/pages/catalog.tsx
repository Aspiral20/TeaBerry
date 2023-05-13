import React, { FC } from 'react';
import { LinkCardPaper, PageContainer, SiteList, TitlePage } from "../_components";
import ChildrenPageContent from "../_components/general/children_page_content";
import { v4 as uuid } from "uuid";
import { ProductsIcon, StatisticsIcon, UsersIcon } from "../_components/icons";

const paperData = [
  {
    id: uuid(),
    to: '/commerce/catalog/users',
    headerTitle: 'Users',
    headerDescription: 'Activity',
    SVGIcon: <UsersIcon/>,
    rightContent: <SiteList data={['View', 'Find']}/>,
  },
  {
    id: uuid(),
    to: '/commerce/catalog/products',
    headerTitle: 'Products',
    headerDescription: 'Activity',
    SVGIcon: <ProductsIcon/>,
    rightContent: <SiteList data={['Add', 'Update', 'View', 'Remove']}/>,
  },
  {
    id: uuid(),
    to: '/commerce/catalog/statistics',
    headerTitle: 'Statistics',
    headerDescription: 'Activity',
    SVGIcon: <StatisticsIcon/>,
    rightContent: <SiteList data={['Users', 'Products']}/>,
  },
]

const chapterData = [
  { id: uuid(), to: '/', name: 'Home' },
  { id: uuid(), to: '/commerce', name: 'Commerce' },
]

interface CatalogProps {
}

const Catalog: FC<CatalogProps> = ({}) => {
  return (
    <PageContainer className="catalog">
      <TitlePage
        title="Catalog"
        data={chapterData}
        className="catalog_title"
        classNames={{
          titleChapter: 'products_title',
          descriptionChapter: 'products_path'
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

export default Catalog;