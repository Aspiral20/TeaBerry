import React, { FC, useState } from 'react';
import { LinkCardPaper, PageContainer, ProductsIcon, SiteList, StatisticsIcon, UsersIcon } from "../_components";
import ChildrenPageContent from "../_components/general/children_page_content";
import { v4 as uuid } from "uuid";
import CatalogIcon from "../_components/icons/catalog.icon";


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
    // to: '/commerce/catalog/statistics',
    to: '/',
    headerTitle: 'Statistics',
    headerDescription: 'Activity',
    SVGIcon: <StatisticsIcon/>,
    rightContent: <SiteList data={['Users', 'Products']}/>,
  },
  {
    id: uuid(),
    to: '/commerce/catalog',
    headerTitle: 'Catalog',
    headerDescription: 'TeaBerry catalog',
    SVGIcon: <CatalogIcon/>,
    rightContent: <SiteList data={['Users', 'Products', 'Statistics']}/>
  }
]

interface HelpProps {
}

const Help: FC<HelpProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([] as typeof paperData)

  function filterItems(arr: Array<any>, query: string) {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
  }

  const handleChange = (e: any) => {

    if (e.target.value === '') {
      setFilteredData([])
    } else {
      setFilteredData(paperData.filter(el => el.headerTitle.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    setSearch(e.target.value)
  }

  return (
    <PageContainer className="help">

      <div className="search">
        <input type="text" value={search} className="help_search" placeholder="Search" onChange={handleChange}/>
      </div>

      <ChildrenPageContent>
        {filteredData.map(({ id, to, headerTitle, headerDescription, SVGIcon, rightContent }) => (
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

export default Help;