import React, { FC, Fragment, useState } from 'react';
import cn from "classnames";
import { Link } from "react-router-dom";
import { DefaultModal, DefaultTitle } from "./index";
import { LinksMenuDataType } from "../../_types";
import { useTranslation } from "react-i18next";
import ArrowIcon from "../icons/arrow.icon";
import { v4 as uuid } from "uuid";

interface MenuLinksInfoPagesModalProps {
  toggleMenu: boolean
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>
  data: LinksMenuDataType
  setData: React.Dispatch<React.SetStateAction<LinksMenuDataType>>
}


const MenuLinksInfoPagesModal: FC<MenuLinksInfoPagesModalProps> = ({
  toggleMenu,
  setToggleMenu,
  data,
  setData
}) => {
  const { t } = useTranslation();

  const menuHandleClick = (e: any) => {
    setData(prev => prev.map(item => e.target.className.includes(`field_${item.name}`) ? ({
      ...item,
      isOpen: !item.isOpen
    }) : item))
  }

  return (
    <DefaultModal
      className="tea_menu"
      isOpen={toggleMenu}
      setToggleFunc={() => setToggleMenu(false)}
    >
      <DefaultTitle className="contacts__title">Menu Links</DefaultTitle>

      {data.map(({ id, name, isOpen, translateKey, children }) => (
        <Fragment key={id}>
          {children ? (
            <div
              className={cn(`link_head_item text`)}
            >
              <div className={cn(`link_head_title field_${name}`, { active: isOpen })} onClick={menuHandleClick}>
                {t(translateKey)}

                <div className="icon">
                  <ArrowIcon/>
                </div>
              </div>
              {isOpen ? (
                <div className="children_links">
                  {children.map(item => (
                    <Link key={item.id} to={item.link} className="link_item text" onClick={() => setToggleMenu(false)}>
                      {t(item.translateKey)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <Link to="/" className={cn("solo_link text")}>
              {t(translateKey)}
            </Link>
          )}
        </Fragment>
      ))}
    </DefaultModal>
  );
};

export default MenuLinksInfoPagesModal;