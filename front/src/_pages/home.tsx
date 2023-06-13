import React, { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import { Container, DefaultTitle, Fon } from "../_components";
import { StoreContext } from "../index";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

interface HomeProps {

}

const Home: FC<HomeProps> = ({}) => {
  const { store } = useContext(StoreContext)
  const { t } = useTranslation()
  // const headerHeight = store.constStore.getData().header.height || 0

  return (
    <>
      <Fon
        className="image_fon"
        style={{
          // paddingTop: `${headerHeight}px`,
          // backgroundImage: `url(/images/site/pages/home/fon2_bkg.jpg)`
        }}
      >
        <Container className="home">
          {/*<img className="smoke-fon" src="images/tea_main/smoke_fon.png" alt=""/>*/}
          <div className="main_content">
            <div className="title_container">
              <DefaultTitle>{t('home.title1')}</DefaultTitle>
              <DefaultTitle>{t('home.title2')}</DefaultTitle>
            </div>
            <div className="main_text text">
              {t('home.description')}
            </div>
            <Link to="/shop">
              <button
                className={cn("auth_submit auth_button button")}
              >
                Treci la magazin
                {/*{t('actions.submit')}*/}
              </button>
            </Link>
          </div>
        </Container>
      </Fon>
    </>
  );
};

export default observer(Home);