import React, { FC, useState } from 'react';
import { Container, Fon } from "../_components/general";
import { v4 as uuid } from 'uuid';
import { SearchIcon } from "../_components";
import { Link } from "react-router-dom";
import MenuModal from "../_components/menu_modal";

const initMenuAdmin = [
  {
    id: uuid(), value: 'Dashboard', isShown: false,
    modal: (
      <div className="dashboard_modal content_modal">
        <div className="list_modal">
          <Link to='/' className="list_item">Main</Link>
          <Link to='/products' className="list_item">Products</Link>
        </div>
      </div>
    )
  },
  {
    id: uuid(), value: 'Help', isShown: false,
    modal: (
      <div className="help_modal content_modal">
        <div className="list_modal">
          <Link to='/profile' className="list_item">Help</Link>
        </div>
      </div>
    )
  },
]

const initMenuUtils = [
  {
    id: uuid(), icon: <SearchIcon className="menu_utils_svg"/>, isShown: false, modal: (
      <>
        Search Modal
      </>
    )
  },
]

const initMenuUser = {
  isShown: false, menu: (
    <div className="user_modal content_modal">
      <div className="list_modal">
        <Link to='/profile' className="list_item">My profile</Link>
      </div>

      <div className="divider"/>

      <div className="list_modal">
        <Link to='/profile/settings' className="list_item">Settings</Link>
        <Link to='/profile/settings' className="list_item">Sign Out</Link>
      </div>
    </div>
  )
}

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({}) => {
  const [menuAdmin, setMenuAdmin] = useState(initMenuAdmin);
  const [menuUtils, setMenuUtils] = useState(initMenuUtils);
  const [menuUser, setMenuUser] = useState(initMenuUser);

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
              <div className="menu_admin_item header__menu_item">
                {value}
              </div>
              {isShown && modal && (
                <MenuModal>
                  {modal}
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
                <div className="menu_utils_item header__menu_item">
                  {icon}
                </div>
                {isShown && modal && (
                  <MenuModal direction={'right'}>
                    {modal}
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
                {menuUser.menu}
              </MenuModal>
            )}
          </div>
        </div>
      </Container>
    </Fon>
  );
};

export default Header;