import React, { FC, useState } from 'react';
import { useParams } from "react-router-dom";
import { ContentGenerator, DefaultTitle, MenuLinksInfoPagesModal, TeaMenuIcon } from "../_components";
import { useTranslation } from "react-i18next";
import ErrorPage from "./error_page";
import { ContentGeneratorDataInType } from "../_types";
import { v4 as uuid } from 'uuid'

interface AssortsProps {
}

const contentGeneratorData = {
  tea: {
    white: [
      { id: uuid(), name: 'title', value: 'assorts.tea.white.title_1' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_1_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_1_2'
      },
      { id: uuid(), name: 'title', value: 'assorts.tea.white.title_2' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_2_1'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'assorts.tea.white.list_item_2_1',
          'assorts.tea.white.list_item_2_2',
          'assorts.tea.white.list_item_2_3',
          'assorts.tea.white.list_item_2_4',
        ]
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/assorts/tea/white_tea_properties1.jpg"
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_2_2'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_2_3'
      },
      { id: uuid(), name: 'title', value: 'assorts.tea.white.title_3' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_3_1'
      },
      { id: uuid(), name: 'title', value: 'assorts.tea.white.title_4' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_4_1'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'assorts.tea.white.list_item_4_1',
          'assorts.tea.white.list_item_4_2',
          'assorts.tea.white.list_item_4_3',
          'assorts.tea.white.list_item_4_4',
          'assorts.tea.white.list_item_4_5',
          'assorts.tea.white.list_item_4_6',
          'assorts.tea.white.list_item_4_7',
          'assorts.tea.white.list_item_4_8',
          'assorts.tea.white.list_item_4_9',
          'assorts.tea.white.list_item_4_10',
          'assorts.tea.white.list_item_4_11',
          'assorts.tea.white.list_item_4_12',
          'assorts.tea.white.list_item_4_13',
          'assorts.tea.white.list_item_4_14',
        ]
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/assorts/tea/black_tea_properties1.png"
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.white.content_4_2'
      },
    ],
    black: [
      { id: uuid(), name: 'title', value: 'assorts.tea.black.title_1' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_2'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_3'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_4'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_5'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_6'
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/assorts/tea/black_tea_properties3.png"
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_7'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_8'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_9'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_1_10'
      },
      { id: uuid(), name: 'title', value: 'assorts.tea.black.title_2' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_2_1'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'assorts.tea.black.list_item_2_1',
          'assorts.tea.black.list_item_2_2',
          'assorts.tea.black.list_item_2_3',
          'assorts.tea.black.list_item_2_4',
          'assorts.tea.black.list_item_2_5',
          'assorts.tea.black.list_item_2_6',
          'assorts.tea.black.list_item_2_7',
        ]
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: "/images/site/pages/assorts/tea/black_tea_properties2.png"
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_2_2'
      },
      { id: uuid(), name: 'title', value: 'assorts.tea.black.title_3' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_3_1'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'assorts.tea.black.list_item_3_1',
          'assorts.tea.black.list_item_3_2',
          'assorts.tea.black.list_item_3_3',
        ]
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_3_2'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_3_3'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'assorts.tea.black.list_item_3_4',
          'assorts.tea.black.list_item_3_5',
          'assorts.tea.black.list_item_3_6',
          'assorts.tea.black.list_item_3_7',
        ]
      },
      { id: uuid(), name: 'title', value: 'assorts.tea.black.title_4' },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_4_1'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_4_2'
      },
      {
        id: uuid(),
        name: 'content',
        value: 'assorts.tea.black.content_4_3'
      },
    ]
  }
} as ContentGeneratorDataInType

const initTeaMenuData = [
  {
    id: uuid(), name: "tea", translateKey: 'shop.modal.tea', isOpen: true, children: [
      { id: uuid(), name: "white", translateKey: 'assorts.modal.white', link: "/assorts/tea/white" },
      { id: uuid(), name: "black", translateKey: 'assorts.modal.black', link: "/assorts/tea/black" },
      // { id: uuid(), name: "green", translateKey: 'assorts.modal.green', link: "/assorts/tea/green" },
      // { id: uuid(), name: "mixes", translateKey: 'assorts.modal.mixes', link: "/assorts/tea/mixes" },
      // { id: uuid(), name: "oolong", translateKey: 'assorts.modal.oolong', link: "/assorts/tea/oolong" },
    ]
  },
]

const contentDataTypeValidator = ['tea', 'coffee']
const contentDataBrandValidator = ['oolong', 'black', 'white', 'green', 'mixes', 'infused', 'boiled', 'vacuum', 'espresso']
const Assorts: FC<AssortsProps> = ({}) => {
  const { type, brand } = useParams()
  const { t } = useTranslation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [teaMenuData, setTeaMenuData] = useState(initTeaMenuData)

  return contentDataTypeValidator.includes(type as string) && contentDataBrandValidator.includes(brand as string) ? (
    <div className="assorts fortitle-container">
      <DefaultTitle className="contacts__title">{t('assorts.beneficial_features')}</DefaultTitle>
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

export default Assorts;