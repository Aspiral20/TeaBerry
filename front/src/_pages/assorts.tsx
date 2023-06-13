import React, { FC, Fragment, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { ContentGenerator, DefaultModal, DefaultTitle, MenuLinksInfoPagesModal, TeaMenuIcon } from "../_components";
import { useTranslation } from "react-i18next";
import ErrorPage from "./error_page";
import { ContentGeneratorDataInType } from "../_types";
import { v4 as uuid } from 'uuid'

interface AssortsProps {
}

const contentGeneratorData = {
  tea: {
    white: [
      { id: uuid(), name: 'title', value: 'Как выглядит белый чай и каков он на вкус' },
      {
        id: uuid(),
        name: 'content',
        value: 'Для белого чая, состоящего только из почек (типсов), характерна продолговатая форма, напоминающая иголки. Типсы имеют светло-серый, чуть зеленоватый цвет, они мягкие на ощупь, и на них отчетливо видны ворсинки. Белый чай, содержащий листья, выглядит немного иначе – он может быть более зеленым на вид, а «иголочки» составляют только часть его массы.'
      },
      {
        id: uuid(),
        name: 'list',
        list: [
          'Бай Хао Инь Чжень («серебряные иглы») – премиальный сорт, содержащий почки без вкраплений листьев в смеси. Среди белых чаев это самый дорогой и самый ценный сорт, так как для производства используются только типсы.',
          'Бай Му Дань («белый пион») – высококачественный белый чай, содержит почки и незначительное количество листьев. В этот чай идут только верхние, начинающие распускаться два листа с каждой ветки.'
        ]
      },
      {
        id: uuid(),
        name: 'image',
        imgUrl: ""
      },
    ],
    black: []
  }
} as ContentGeneratorDataInType

const initTeaMenuData = [
  {
    id: uuid(), name: "tea", translateKey: 'shop.modal.tea', isOpen: true, children: [
      { id: uuid(), name: "white", translateKey: 'assorts.modal.white', link: "/assorts/tea/white" },
      { id: uuid(), name: "black", translateKey: 'assorts.modal.black', link: "/assorts/tea/black" },
      { id: uuid(), name: "green", translateKey: 'assorts.modal.green', link: "/assorts/tea/green" },
      { id: uuid(), name: "mixes", translateKey: 'assorts.modal.mixes', link: "/assorts/tea/mixes" },
      { id: uuid(), name: "oolong", translateKey: 'assorts.modal.oolong', link: "/assorts/tea/oolong" },
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