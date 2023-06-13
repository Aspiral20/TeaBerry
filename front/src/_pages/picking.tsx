import React, { FC, useState } from 'react';
import { useParams } from "react-router-dom";
import { ContentGenerator, DefaultTitle, MenuLinksInfoPagesModal, TeaMenuIcon } from "../_components";
import ErrorPage from "./error_page";
import { ContentGeneratorDataInType } from "../_types";
import { v4 as uuid } from 'uuid'
import { useTranslation } from "react-i18next";

interface PickingProps {

}

const contentGeneratorData = {
  tea: {
    white_tea: []
  }
} as ContentGeneratorDataInType

const initTeaMenuData = [
  {
    id: uuid(), name: "tea", translateKey: 'shop.modal.tea', isOpen: true, children: [
      { id: uuid(), name: "white", translateKey: 'assorts.modal.white', link: "/picking/tea/white" },
      { id: uuid(), name: "black", translateKey: 'assorts.modal.black', link: "/picking/tea/black" },
      { id: uuid(), name: "green", translateKey: 'assorts.modal.green', link: "/picking/tea/green" },
      { id: uuid(), name: "mixes", translateKey: 'assorts.modal.mixes', link: "/picking/tea/mixes" },
      { id: uuid(), name: "oolong", translateKey: 'assorts.modal.oolong', link: "/picking/tea/oolong" },
    ]
  },
]

const contentDataTypeValidator = ['tea', 'coffee']
const contentDataBrandValidator = ['oolong', 'dark', 'white', 'green', 'mixes', 'infused', 'boiled', 'vacuum', 'espresso']
const Picking: FC<PickingProps> = ({}) => {
  const { type, brand } = useParams()
  const { t } = useTranslation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [teaMenuData, setTeaMenuData] = useState(initTeaMenuData)

  return contentDataTypeValidator.includes(type as string) && contentDataBrandValidator.includes(brand as string) ? (
    <div className="picking fortitle-container">
      <DefaultTitle className="contacts__title">{t('picking.assembly_process_of_tea')}</DefaultTitle>
      <div className="tea-icon" onClick={() => setToggleMenu(true)}>
        <TeaMenuIcon/>
      </div>

      <ContentGenerator data={contentGeneratorData[type as string][brand as string] || []}/>

      <MenuLinksInfoPagesModal
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        data={teaMenuData}
        setData={setTeaMenuData}
      />
    </div>
  ) : <ErrorPage/>;
};

export default Picking;