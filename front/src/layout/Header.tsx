import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import routesElements from "../context/routes_elements";
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const lang = [
  { key: 'en', lang: 'EN' },
  { key: 'ro', lang: 'RO' },
  { key: 'ru', lang: 'RU' },
]

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {
  const { t, i18n } = useTranslation()
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
            <img src="/logo/logo.png" alt="..." className=""/>
          </Link>
        </div>
        <div className="menu_items">
          {routesElements.map(({ id, header, path, value }) => (
            <Fragment key={id}>
              {header && (
                <Link to={path} className="menu_item">
                  {value && t(`pages.${value}`)}
                </Link>
              )}
            </Fragment>
          ))}
        </div>
        <div className="action_container">
          <div className='language'>
            <div className="current-lang" onClick={() => {
              setOpenLang(prevState => !prevState)
            }}>
              {currentLang}
            </div>
            {openLang && (
              <div className='change-lang'>
                {lang.map(lng => {
                  return (
                    <Fragment>
                      {lng.key !== i18n.language && <div key={lng.key} className="lng-item" onClick={() => {
                        i18n.changeLanguage(lng.key)
                        setOpenLang(false)
                      }}>
                        {lng.lang}
                      </div>}
                    </Fragment>
                  )
                })}
              </div>
            )}
          </div>

          <div className="user">
            {!store.isAuth ?
              <div className="user_not_logged user_auth_container">
                <Link to={`/auth/login`}>Login</Link>
                <Link to={`/registration`}>Registration</Link>
              </div>
              :
              <div className="user_logged user_auth_container">
                <Link to={`/profile`}><img src="/logo/profile.jpg" alt="..." style={{ maxWidth: 60 }}/></Link>
                <Link to={`/`}>
                  <button onClick={() => store.logout()}>Logout</button>
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