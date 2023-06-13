import React, { FC, Fragment, useContext, useState } from 'react';
import { BurgerAdaptive, FilterIcon, HomeIcon } from "../_components";
import cn from "classnames";
import { menuLinks } from "./header";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { StoreContext } from "../index";
import RootStore from "../store";

const botContent = [
  {
    id: uuid(),
    value: 'shop.filter',
    icon: <FilterIcon className="adaptive_menu_icon fill_all"/>,
    onlyOnPage: '/shop',
    func: (store: RootStore) => {
      store.constStore.setShopFilter({ isOpen: true })
    }
  },
]

interface AdaptiveMenuProps {

}

const AdaptiveMenu: FC<AdaptiveMenuProps> = ({}) => {
  const { t } = useTranslation()
  const [isOpenBurger, setIsOpenBurger] = useState(false)
  const { pathname } = useLocation()
  const { store } = useContext(StoreContext)

  return (
    <>
      <div
        className={cn("adaptive_menu_fon", { active: isOpenBurger })}
        onClick={() => setIsOpenBurger(prev => !prev)}
      />
      <div className={cn("adaptive_menu", { active: isOpenBurger })}>
        <div className="burger_menu">
          <div/>
          <div className="burger_title title">
            Menu
          </div>
          <BurgerAdaptive classNameAnimation={isOpenBurger} onClick={() => setIsOpenBurger(prev => !prev)}/>
        </div>
        <div className="menu_section">
          {menuLinks.map(({ id, path, value, icon }) => (
            <Link
              key={id}
              to={path}
              className={cn("menu_item", { active: value !== 'home' ? pathname.includes(path) : pathname === path })}
              onClick={() => setIsOpenBurger(false)}
            >
              <div className="link_text">
                {value && t(`pages.${value}`)}
              </div>
              <div className="link_icon">
                {icon}
              </div>
            </Link>
          ))}
        </div>
        <div className="menu_section">
          {botContent.map(({ id, value, icon, onlyOnPage, func }) => (
            <div
              key={id}
              className={cn("menu_item", { notOnPage: !pathname.includes(onlyOnPage) })}
              onClick={() => {
                setIsOpenBurger(false)
                if (func) func(store);
              }}
            >
              <div className="link_text">
                {value && t(value)}
              </div>
              <div className="link_icon">
                {icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdaptiveMenu;