import React, { FC, Fragment, useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { CoffeeIcon, ContactsEmailIcon, Container, HomeIcon, PickTeaIcon } from "../_components";
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
    path: 'assorts',
    value: 'assorts',
    icon: <CoffeeIcon className="adaptive_menu_icon"/>
  },
  {
    id: uuid(),
    path: 'picking',
    value: 'picking',
    icon: <PickTeaIcon className="adaptive_menu_icon"/>
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
  const { pathname } = useLocation()
  const { store } = useContext(StoreContext);
  const { authStore, langStore } = store

  useEffect(() => {
    langs.forEach(lng => lng.key === i18n.language ? langStore.setLang(lng.lang) : null)
  }, [i18n.language])

  return (
    <Container className="header">
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
                  <img className="profile_img" src="/logo/profile.jpg" alt="..."/>
                </Link>
                <Link to={`/`}>
                  <button className="user_logout" onClick={() => authStore.logout()}>
                    {t('actions.logout')}
                  </button>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default observer(Header);