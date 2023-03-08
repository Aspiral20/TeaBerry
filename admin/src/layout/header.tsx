import React, { FC, useEffect, useState } from 'react';
import { Container, Fon } from "../_components/general";
import { v4 as uuid } from 'uuid';
import {
  ContentModal,
  DividerModal,
  ListItem,
  ListModal,
  MenuModal,
  MoonIcon,
  SearchIcon,
  SunIcon
} from "../_components";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ReducersTypes } from "../_types/store";
import { useLocation } from "react-router-dom";

const initMenuAdmin = [
  {
    id: uuid(), value: 'Dashboard', isShown: false,
    modal: (pathname: string) => (
      <ContentModal className="dashboard_modal">
        <ListModal>
          <ListItem cnParams={{ active: pathname === '/' }} linkTo='/'>Main</ListItem>
          <ListItem cnParams={{ active: pathname.includes('products') }}
                    linkTo='/commerce/catalog/products'>Products</ListItem>
        </ListModal>
      </ContentModal>
    )
  },
  {
    id: uuid(), value: 'Help', isShown: false,
    modal: (pathname: string) => (
      <ContentModal className="help_modal">
        <ListModal>
          <ListItem cnParams={{ active: pathname === '/help' }} linkTo='/help'>Help</ListItem>
        </ListModal>
      </ContentModal>
    )
  },
]

const initMenuUtils = [
  {
    id: uuid(), icon: () => <SearchIcon className="menu_utils_svg"/>, isShown: false, modal: () => (
      <>
        Search Modal
      </>
    )
  },
  {
    id: uuid(),
    icon: (siteMode: string) => siteMode === 'light' ? <SunIcon className="menu_utils_svg"/> :
      <MoonIcon className="menu_utils_svg"/>,
    isShown: false,
    modal: (siteMode: string, dispatch: Dispatch) => (
      <ContentModal className={"site_mode"}>
        <ListModal>
          <ListItem cnParams={{ svg_active_mode: siteMode === 'light' }} onClick={() => {
            dispatch({ type: 'site_mode', mode: 'light' })
          }}><SunIcon className="menu_utils_svg"/> Light</ListItem>
          <ListItem cnParams={{ svg_active_mode: siteMode === 'dark' }} onClick={() => {
            dispatch({ type: 'site_mode', mode: 'dark' })
          }}><MoonIcon className="menu_utils_svg"/> Dark</ListItem>
        </ListModal>
      </ContentModal>
    )
  },
]

const initMenuUser = {
  isShown: false, menu: (pathname: string) => (
    <ContentModal className="user_modal">
      <ListModal>
        <ListItem cnParams={{ active: pathname === '/profile' }} linkTo='/profile'>
          My profile
        </ListItem>
      </ListModal>

      <DividerModal/>

      <ListModal>
        <ListItem linkTo='/profile/settings'>Settings</ListItem>
        <ListItem linkTo='/'>Sign Out</ListItem>
      </ListModal>
    </ContentModal>
  )
}

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {
  const [menuAdmin, setMenuAdmin] = useState(initMenuAdmin);
  const [menuUtils, setMenuUtils] = useState(initMenuUtils);
  const [menuUser, setMenuUser] = useState(initMenuUser);
  const siteMode = useSelector<ReducersTypes, string>(prev => prev.SiteColorMode.mode)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    localStorage.setItem('site_mode', siteMode)
  }, [siteMode])

  const isShownMap = (
    arr: Array<any>,
    id: string,
    bool: boolean
  ) => arr.map(item => item.id === id ? { ...item, isShown: bool } : item)

  return (
    <Fon>
      <Container className="header main_layout">
        <div className="menu_admin_container header__menu">
          {menuAdmin.map(({ id, value, isShown, modal }) => (
            <div
              key={id}
              className="header__menu_content_item"
              onMouseEnter={() => setMenuAdmin(prev => isShownMap(prev, id, true))}
              onMouseLeave={() => setMenuAdmin(prev => isShownMap(prev, id, false))}
            >
              <div className="menu_admin_item header__menu_item menu_button">
                {value}
              </div>
              {isShown && modal && (
                <MenuModal>
                  {modal(pathname)}
                </MenuModal>
              )}
            </div>
          ))}
        </div>
        <div className="menu_utils_container header__menu">
          <div className="utils_content">
            {menuUtils.map(({ id, icon, isShown, modal }) => (
              <div
                key={id}
                className="header__menu_content_item"
                onMouseEnter={() => setMenuUtils(prev => isShownMap(prev, id, true))}
                onMouseLeave={() => setMenuUtils(prev => isShownMap(prev, id, false))}
              >
                <div className="menu_utils_item header__menu_item menu_button">
                  {icon(siteMode)}
                </div>
                {isShown && modal && (
                  <MenuModal direction={'right'}>
                    {modal(siteMode, dispatch)}
                  </MenuModal>
                )}
              </div>
            ))}
          </div>
          <div
            className="user_photo_container header__menu_content_item"
            onMouseEnter={() => setMenuUser(prev => ({ ...prev, isShown: true }))}
            onMouseLeave={() => setMenuUser(prev => ({ ...prev, isShown: false }))}
          >
            <img className="user_photo" src="/logo/account_image.jpg" alt="..."/>
            {menuUser.isShown && (
              <MenuModal direction={'right'}>
                {menuUser.menu(pathname)}
              </MenuModal>
            )}
          </div>
        </div>
      </Container>
    </Fon>
  );
};

export default Header;