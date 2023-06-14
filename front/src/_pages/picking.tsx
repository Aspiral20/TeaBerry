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
    white: [
      { id: uuid(), name: 'title', value: 'picking.tea.white.title_1' },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_1_1'
      },
      { id: uuid(), name: 'title', value: 'picking.tea.white.title_2' },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_2_1'
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/picking/tea/white_tea_picking1.jpg"
      },
      { id: uuid(), name: 'title', value: 'picking.tea.white.title_3' },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_2'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_3'
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/picking/tea/white_tea_picking2.jpg"
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_4'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_5'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_6'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_3_7'
      },
      { id: uuid(), name: 'title', value: 'picking.tea.white.title_4' },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_4_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_4_2'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_4_3'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_4_4'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.white.content_4_5'
      },
    ],
    green: [
      { id: uuid(), name: 'title', value: 'picking.tea.green.title_1' },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_2'
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/assorts/tea/green_tea_picking1.jpg"
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_3'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_4'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_5'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_6'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_7'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_1_8'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'picking.tea.green.list_item_1_1',
          'picking.tea.green.list_item_1_2',
          'picking.tea.green.list_item_1_3',
          'picking.tea.green.list_item_1_4',
          'picking.tea.green.list_item_1_5',
          'picking.tea.green.list_item_1_6',
        ]
      },
      { id: uuid(), name: 'title', value: 'picking.tea.green.title_2' },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_2_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'picking.tea.green.content_2_2'
      },
    ]
  }
} as ContentGeneratorDataInType

const initTeaMenuData = [
  {
    id: uuid(), name: "tea", translateKey: 'shop.modal.tea', isOpen: true, children: [
      { id: uuid(), name: "white", translateKey: 'assorts.modal.white', link: "/picking/tea/white" },
      // { id: uuid(), name: "black", translateKey: 'assorts.modal.black', link: "/picking/tea/black" },
      { id: uuid(), name: "green", translateKey: 'assorts.modal.green', link: "/picking/tea/green" },
      // { id: uuid(), name: "mixes", translateKey: 'assorts.modal.mixes', link: "/picking/tea/mixes" },
      // { id: uuid(), name: "oolong", translateKey: 'assorts.modal.oolong', link: "/picking/tea/oolong" },
    ]
  },
]

const contentDataTypeValidator = ['tea', 'coffee']
const contentDataBrandValidator = ['oolong', 'black', 'white', 'green', 'mixes', 'infused', 'boiled', 'vacuum', 'espresso']
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