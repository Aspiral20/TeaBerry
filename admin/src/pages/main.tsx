import React, { FC, useEffect, useState } from 'react';
import { ChildrenPageContent, PageContainer, TitlePage } from "../_components";
import { ProductsService } from "../models/services";
import { CountStatusesProductsType } from "../_types/data";
import StatisticProgressBar from "../_components/general/statistic_progress_bar";
import UsersService from "../models/services/users_service";

interface MainProps {
}

const Main: FC<MainProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusesProducts, setStatusesProducts] = useState([] as CountStatusesProductsType);
  const [statusesUsers, setStatusesUsers] = useState([] as CountStatusesProductsType);

  const fetchStatuses = () => {
    try {
      setIsLoading(true)

      const promiseProducts = ProductsService.getAllStatusCountProducts();
      promiseProducts.then(res => {
        const resData = res.data
        setStatusesProducts(resData.map(item => ({ ...item, isHovered: false })))
      })

      const promiseUsers = UsersService.getAllStatusCountUsers();
      promiseUsers.then(res => {
        const resData = res.data
        setStatusesUsers(resData.map(item => ({ ...item, isHovered: false })))
      })

    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatuses();
  }, [])

  return (
    <PageContainer className="main">
      <TitlePage
        title="Main Dashboard"
        className="main_title margin_bottom"
        classNames={{
          titleChapter: 'main_chapter_title',
        }}
      />

      <ChildrenPageContent className="main_dashboard">

        <StatisticProgressBar
          title={"Products"}
          name={"products"}
          dataField={'status'}
          isLoading={isLoading}
          data={statusesProducts}
          setData={setStatusesProducts}
        />

        <StatisticProgressBar
          title={"Users"}
          name={"users"}
          dataField={'role'}
          isLoading={isLoading}
          data={statusesUsers}
          setData={setStatusesUsers}
        />
      </ChildrenPageContent>
    </PageContainer>
  );
};

export default Main;