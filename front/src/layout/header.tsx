import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import cn from "classnames";

const lang = [
  { key: 'en', lang: 'EN' },
  { key: 'ro', lang: 'RO' },
  { key: 'ru', lang: 'RU' },
]

const menuLinks = [
  {
    id: uuid(),
    path: 'assorts',
    value: 'assorts',
  },
  {
    id: uuid(),
    path: 'picking',
    value: 'picking',
  },
  {
    id: uuid(),
    path: 'contacts',
    value: 'contacts',
  },
]

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const { store } = useContext(StoreContext);
  const [currentLang, setCurrentLang] = useState(lang[0].lang);
  const [openLang, setOpenLang] = useState<boolean>(false);

  useEffect(() => {
    lang.forEach(lng => lng.key === i18n.language ? setCurrentLang(lng.lang) : null)
  }, [i18n.language])

  return (
    <div className="header container">
      <div className="header__menu">
        <div className="logo_item">
          <Link to="/" className="logo">
            <img className="logo-img" src="/logo/logo.png" alt="..."/>
          </Link>
        </div>
        <div className="menu_items">
          {menuLinks.map(({ id, path, value }) => (
            <Link key={id} to={path} className={cn("menu_item", {'active': pathname.includes(path)})}>
              {value && t(`pages.${value}`)}
            </Link>
          ))}
        </div>
        <div className="action_container">
          <div className='language'>
            <div className={cn("current_lang", {'active': openLang})} onClick={() => {
              setOpenLang(prevState => !prevState)
            }}>
              {currentLang}
            </div>
            {openLang && (
              <div className='change_lang'>
                {lang.map(lng => {
                  return (
                    <Fragment>
                      {lng.key !== i18n.language && (
                        <div key={lng.key} className="lng_item" onClick={() => {
                          i18n.changeLanguage(lng.key)
                          setOpenLang(false)
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
            {!store.isAuth ?
              <div className="user_not_logged user_auth_container">
                <Link className="login auth_action" to={`/auth/login`}>{t('actions.login')}</Link>
                <Link className="registration auth_action" to={`/registration`}>{t('actions.registration')}</Link>
              </div>
              :
              <div className="user_logged user_auth_container">
                <Link className="profile" to={`/profile`}>
                  <img className="profile_img" src="/logo/profile.jpg" alt="..." style={{ maxWidth: 60 }}/>
                </Link>
                <Link to={`/`}>
                  <button className="" onClick={() => store.logout()}>{t('actions.logout')}</button>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Header);