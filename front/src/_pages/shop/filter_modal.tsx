import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { DefaultModal, DefaultTitle } from "../../_components";
import { StoreContext } from "../../index";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid'
import ArrowIcon from "../../_components/icons/arrow.icon";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { ProductsType } from "../../_types/services/product.type";
import ProductService from "../../services/ProductService";
import { renameFieldObjectArray } from "../../_utils";
import { DefaultObjectsItemType, FilterType, SortType } from "../../_types";

const initSectionsFilter = [
  {
    id: uuid(),
    title: 'shop.modal.price',
    name: 'price',
    fields: [
      { id: uuid(), name: 'none', title: 'shop.modal.none', isChecked: false },
      { id: uuid(), name: 'increase', title: 'shop.modal.increase', isChecked: false },
      { id: uuid(), name: 'decrease', title: 'shop.modal.decrease', isChecked: false },
    ],
    checkOneInGroup: true,
    isOpen: false
  },
  {
    id: uuid(),
    title: 'shop.modal.quantity',
    name: 'quantity',
    fields: [
      { id: uuid(), name: 'none', title: 'shop.modal.none', isChecked: false },
      { id: uuid(), name: 'increase', title: 'shop.modal.increase', isChecked: false },
      { id: uuid(), name: 'decrease', title: 'shop.modal.decrease', isChecked: false },
    ],
    checkOneInGroup: true,
    isOpen: false
  },
  {
    id: uuid(),
    title: 'shop.modal.type',
    name: 'type',
    fields: [
      { id: uuid(), name: 'all', title: 'shop.modal.all', isChecked: false },
      { id: uuid(), name: 'tea', title: 'shop.modal.tea', isChecked: false },
      { id: uuid(), name: 'coffee', title: 'shop.modal.coffee', isChecked: false }
    ],
    checkOneInGroup: false,
    isOpen: false
  },
  {
    id: uuid(),
    title: 'shop.modal.status',
    name: 'status',
    fields: [
      { id: uuid(), name: 'all', title: 'shop.modal.all', isChecked: false },
      { id: uuid(), name: 'active', title: 'shop.modal.active', isChecked: false },
      { id: uuid(), name: 'pending', title: 'shop.modal.pending', isChecked: false },
      { id: uuid(), name: 'disapproved', title: 'shop.modal.disapproved', isChecked: false },
      { id: uuid(), name: 'expired', title: 'shop.modal.expired', isChecked: false },
    ],
    checkOneInGroup: false,
    isOpen: false
  },
]

interface FilterModalProps {
  setProducts: React.Dispatch<React.SetStateAction<ProductsType>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterModal: FC<FilterModalProps> = ({
  setProducts,
  setIsLoading,
}) => {
  const { store } = useContext(StoreContext)
  const { t } = useTranslation()
  const [sections, setSections] = useState(initSectionsFilter)
  const { pathname } = useLocation()

  const openAllSections = () => {
    setSections(prev => prev.map(item => ({
      ...item,
      isOpen: true
    })))
  }

  const closeAllSections = () => {
    setSections(prev => prev.map(item => ({
      ...item,
      isOpen: false
    })))
  }

  const toggleSection = (e: any) => {
    setSections(prev => prev.map(item => e.target.className.includes(item.name) ? ({
      ...item,
      isOpen: !item.isOpen
    }) : item))
  }

  const changeField = (e: any) => {
    if (e.target.name) {
      setSections(prev => prev.map(item =>
        // 1 type filter
        e.target.className.includes('oneInGroup') ?
          e.target.className.includes(item.name) ? ({
              ...item,
              fields: item.fields.map(field =>
                field.name === e.target.name ?
                  ({ ...field, isChecked: true }) :
                  ({ ...field, isChecked: false })
              )
            }) :
            item.checkOneInGroup ? ({
                ...item,
                fields: item.fields.map(field =>
                  field.name === 'none' ?
                    ({ ...field, isChecked: true }) :
                    ({ ...field, isChecked: false })
                )
              }) :
              item :
          // 2 type filter
          e.target.className.includes(item.name) ?
            e.target.name === 'all' ? ({
              ...item,
              fields: item.fields.map(field =>
                field.name === 'all' ?
                  ({ ...field, isChecked: true }) :
                  ({ ...field, isChecked: false })
              )
            }) : ({
              ...item,
              fields: item.fields.map(field =>
                field.name === 'all' ?
                  ({ ...field, isChecked: false }) :
                  field.name === e.target.name ?
                    ({ ...field, isChecked: !field.isChecked }) :
                    field
              )
            })
            : item))
    }
  }

  const filterData = async () => {
    setIsLoading(true)
    try {
      let sort = {} as SortType, filter = {} as FilterType

      sections.forEach(item => {
        if (item.checkOneInGroup) {
          item.fields.forEach(field => {
            if (field.isChecked) {
              if (field.name === 'increase') {
                sort = { ...sort, [item.name]: 1 }
              }

              if (field.name === 'decrease') {
                sort = { ...sort, [item.name]: -1 }
              }
            }
          })
        } else {
          if (item.fields.some(someItem => someItem.isChecked)) {
            filter = { ...filter, [item.name]: { $in: [] } }

            console.log()

            if (item.fields[0].isChecked) {
              item.fields.forEach(field => {
                if (field.name !== 'all') {
                  filter[item.name].$in.push(field.name)
                }
              })
            } else {
              item.fields.forEach(field => {
                if (field.isChecked) {
                  filter[item.name].$in.push(field.name)
                }
              })
            }
          }
        }
      })

      await ProductService.filterProducts({ sort, filter })
        .then(res => {
          const resData = res.data
          renameFieldObjectArray(resData, '_id', 'id');

          setProducts(resData)
        })
        .catch(err => console.log(`Something went wrong: ${err}`));
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DefaultModal
      className="filter_modal"
      isOpen={store.constStore.getData('shopFilter').isOpen}
      setToggleFunc={() => {
        store.constStore.setShopFilter({ isOpen: false })
        filterData()
      }}
    >
      <DefaultTitle className="filter_title">Filter</DefaultTitle>

      <div className="filter_container features_filter">
        <button className="filter_button open_all" onClick={openAllSections}>
          {t('shop.modal.open_all')}
        </button>
        <button className="filter_button close_all" onClick={closeAllSections}>
          {t('shop.modal.close_all')}
        </button>
      </div>

      <div className="filter_container toggle_section">
        {sections.map(section => (
          <div className="section" key={section.id}>
            <div
              className={cn(`section_title text ${section.name}`, { active: section.isOpen })}
              onClick={toggleSection}
            >
              {t(section.title)}
              <div className="icon">
                <ArrowIcon/>
              </div>
            </div>
            <div className={cn("section_content", { active: section.isOpen })}>
              {section.fields.map(field => (
                <label key={field.id} className="check_item" onClick={changeField}>
                  <input
                    name={field.name}
                    className={cn(`check_input ${section.name}`, { oneInGroup: section.checkOneInGroup })}
                    type="checkbox"
                    checked={field.isChecked}
                  />
                  <div className="check_text text">
                    {t(field.title)}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DefaultModal>
  );
};

export default observer(FilterModal);