import React, { FC, Fragment, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import {
  AboutIcon,
  CoffeeIcon,
  ContactsEmailIcon,
  Container,
  Fon,
  HomeIcon,
  PickTeaIcon,
  ShopBasketIcon
} from "../_components";
import { langs } from "../store/lang_store";

export const menuLinks = [
  {
    id: uuid(),
    path: '/',
    value: 'home',
    icon: <HomeIcon className="adaptive_menu_icon"/>
  },
  {
    id: uuid(),
    path: 'assorts/tea/white',
    value: 'assorts',
    icon: <CoffeeIcon className="adaptive_menu_icon"/>
  },
  {
    id: uuid(),
    path: 'picking/tea/white',
    value: 'picking',
    icon: <PickTeaIcon className="adaptive_menu_icon"/>
  },
  {
    id: uuid(),
    path: 'shop',
    value: 'shop',
    icon: <ShopBasketIcon className="adaptive_menu_icon fill_all"/>
  },
  {
    id: uuid(),
    path: 'about',
    value: 'about',
    icon: <AboutIcon className="adaptive_menu_icon"/>
  },
  {
    id: uuid(),
    path: 'contacts',
    value: 'contacts',
    icon: <ContactsEmailIcon className="adaptive_menu_icon"/>
  },
]

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation();
  const { store } = useContext(StoreContext);
  const { authStore, langStore } = store
  const headerRef = useRef<HTMLDivElement>(null);
  const fonImage = store.constStore.getData('fonImage');

  useEffect(() => {
    langs.forEach(lng => lng.key === i18n.language ? langStore.setLang(lng.lang) : null)
  }, [i18n.language])

  useEffect(() => {
    const headerRefCurrent = headerRef.current


    if (headerRef && headerRefCurrent) {
      store.constStore.setHeader({
        width: headerRefCurrent.clientWidth,
        height: headerRefCurrent.clientHeight
      })
    }
  }, [pathname])

  return (
    <Fon className={cn("header_fon", { isFixed: store.constStore.getData('header').isFixed, filter: fonImage.id })}
         refContainer={headerRef}>
      <Container className={cn("header", { image_fon: fonImage.id })}>
        <div className="header__menu">
          <div className="logo_item">
            <Link to="/" className="logo">
              <img className="logo-img" src="/logo/logo.png" alt="..."/>
            </Link>
          </div>
          <div className="menu_items">
            {menuLinks.map(({ id, path, value }) => value !== 'home' && (
              <Link key={id} to={path} className={cn("menu_item", { 'active': pathname.includes(path) })}>
                {value && t(`pages.${value}`)}
              </Link>
            ))}
          </div>
          <div className="action_container">
            <div className='language'>
              <div className={cn("current_lang", { 'active': langStore.toggleLang })} onClick={() => {
                langStore.setToggleLang(!langStore.toggleLang)
              }}>
                {langStore.lang}
              </div>
              {langStore.toggleLang && (
                <div className='change_lang'>
                  {langs.map(lng => {
                    return (
                      <Fragment key={uuid()}>
                        {lng.key !== i18n.language && (
                          <div key={lng.key} className="lng_item" onClick={() => {
                            i18n.changeLanguage(lng.key)
                          }}>
                            {lng.lang}
                          </div>
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="user">
              {!authStore.isAuth ?
                <div className="user_not_logged user_auth_container">
                  <Link className="login auth_action" to={`/auth/login`}>{t('actions.login')}</Link>
                </div>
                :
                <div className="user_logged user_auth_container">
                  <Link className="profile" to={`/profile/info`}>
                    {/*<div className="profile_img" style={{backgroundImage: `url("/logo/profile.jpg")`}}/>*/}
                    <img className="profile_img" src="/logo/account_image.jpg" alt="..."/>
                  </Link>
                  <Link to={pathname.includes('profile') ? `/` : pathname}>
                    <button className="user_logout auth_action" onClick={() => authStore.logout()}>
                      {t('actions.logout')}
                    </button>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </Fon>
  );
};

export default observer(Header);