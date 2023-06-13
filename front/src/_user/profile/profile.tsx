import React, { FC, useContext, useEffect } from 'react';
import { StoreContext } from "../../index";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Link, Outlet, useLocation } from "react-router-dom";
import cn from "classnames";
import { EditUserIcon, ShopBasketIcon, UserIcon } from "../../_components";
import { v4 as uuid } from 'uuid';
import { Error_page } from "../../_pages";
import ContentLoader from "../../_components/content_loader";

// Example:https://www.bootdey.com/snippets/view/user-profile-bio-graph-and-total-sales

const menuProfile = [
  { id: uuid(), icon: <UserIcon/>, name: 'profile', field: "Profile", link_to: '/profile/info' },
  { id: uuid(), icon: <ShopBasketIcon/>, name: 'basket', field: "Basket", link_to: '/profile/basket' },
  { id: uuid(), icon: <EditUserIcon/>, name: 'edit_profile', field: "Edit Profile", link_to: '/profile/edit_profile' },
]

interface ProfileProps {
}

const Profile: FC<ProfileProps> = ({}) => {
  const { store } = useContext(StoreContext)
  const { userStore, authStore } = store
  const { pathname } = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    userStore.fetchUser()
  }, [])

  useEffect(() => {
    if (userStore.user && !userStore.isLoading) {
      userStore.userStoreSetData()
    }
  }, [])

  useEffect(() => {
    userStore.fetchUser()
  }, [pathname])

  useEffect(() => {
    userStore.userStoreSetData()
  }, [userStore.user])

  return (
    <>
      {authStore.isAuth ? (
        <div className="profile__container">
          <div className={cn("profile__menu_container", { loaded: !userStore.isLoading })}>
            {!userStore.isLoading ? (
              <>
                <div className="photo_container">
                  <Link to='/profile/info' className="image_link">
                    <img className="image" src="/logo/account_image.jpg" alt="..."/>
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
              </>
            ) : (
              <ContentLoader/>
            )}
          </div>
          <div className="profile__info_container">
            {!userStore.isLoading ? (
              <Outlet/>
            ) : (
              <ContentLoader/>
            )}
          </div>
        </div>
      ) : (
        <Error_page/>
      )}
    </>
  );
};

export default observer(Profile);