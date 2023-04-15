import React, { FC, useState } from 'react';
import { BurgerAdaptive } from "../_components";
import cn from "classnames";
import { menuLinks } from "./header";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface AdaptiveMenuProps {

}

const AdaptiveMenu: FC<AdaptiveMenuProps> = ({}) => {
  const { t } = useTranslation()
  const [isOpenBurger, setIsOpenBurger] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      <div className={cn("adaptive_menu_fon", { active: isOpenBurger })}
           onClick={() => setIsOpenBurger(prev => !prev)}/>
      <div className={cn("adaptive_menu", { active: isOpenBurger })}>
        <div className="burger_menu">
          <div/>
          <div className="burger_title title">
            Menu
          </div>
          <BurgerAdaptive classNameAnimation={isOpenBurger} onClick={() => setIsOpenBurger(prev => !prev)}/>
        </div>
        <div className="menu_content">
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
      </div>
    </>
  );
};

export default AdaptiveMenu;