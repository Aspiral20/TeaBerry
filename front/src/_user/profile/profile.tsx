import React, { FC, useContext, useEffect, useState } from 'react';
import { StoreContext } from "../../index";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { IUser } from "../../models/user.type";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { EditUserIcon, ShopBasketIcon, UserIcon } from "../../_components";
import FullScreenLoader from "../../_components/full-screen_loader";
import { ArrayCommonDataType } from "../../_types";
import { v4 as uuid } from 'uuid';
import { Error_page } from "../../_pages";

// Example:https://www.bootdey.com/snippets/view/user-profile-bio-graph-and-total-sales

const menuProfile = [
  { id: uuid(), icon: <UserIcon/>, field: "Profile", link_to: '/profile' },
  { id: uuid(), icon: <ShopBasketIcon/>, field: "Basket", link_to: '/profile/basket' },
  { id: uuid(), icon: <EditUserIcon/>, field: "Edit Profile", link_to: '/profile/edit_profile' },
]

interface ProfileProps {
}
const initUserInfo = [{}] as ArrayCommonDataType

const Profile: FC<ProfileProps> = ({}) => {
  const { store } = useContext(StoreContext)
  const [ userInfo, setUserInfo ] = useState(initUserInfo)
  const { pathname } = useLocation()
  const { userStore, authStore } = store
  const { t } = useTranslation()

  useEffect(() => {
    userStore.fetchUser()
  }, [])

  useEffect(() => {
    const valuesUser = Object.values(userStore.user)
    const keysUser = Object.keys(userStore.user)

    setUserInfo(
      keysUser.map((item, i) => ({
        id: uuid(),
        field: item,
        value: valuesUser[i].toString()
      }))
    )
  }, [userStore.user])

  return (
    <>
      {authStore.isAuth ? (
        !userStore.isLoading ? (
          <div className="profile__container">
            <div className="profile__menu_container">
              <div className="photo_container">
                <Link to='/profile' className="image_link">
                  <img className="image" src="logo/profile.jpg" alt="..."/>
                </Link>
                <div className="name text">
                  {userStore.user.full_name}
                </div>
              </div>
              <div className="profile_menu">
                {menuProfile.map(({ id, icon, field, link_to }) => (
                  <Link key={id} to={link_to} className={cn("profile_item", { active: pathname === link_to })}>
                    <div className="icon">{icon}</div>
                    <div className="text">{field}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="profile__info_container">
              <Outlet context={{ userInfo }}/>
            </div>
          </div>
        ) : (
          <FullScreenLoader/>
        )
      ): (
        <Error_page/>
      )}
    </>

  );
};

export default observer(Profile);