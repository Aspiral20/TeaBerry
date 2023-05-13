import React, { ChangeEvent } from "react";
import { DefaultObjectItemType } from "../_types/general";
import { SiteInputObjectType, SiteInputsObjectType } from "../_types/data";

// handleChange
export const handleChangeArr = (stateData: React.Dispatch<React.SetStateAction<SiteInputsObjectType>>, func?: (e: ChangeEvent<HTMLInputElement>) => void) => (e: ChangeEvent<HTMLInputElement>) => {
  stateData(prev => prev.map(item => item.name === e.target.name && e.target.name !== 'type' && e.target.name !== 'brand' ? {
    ...item,
    value: e.target.value
  } : item))

  if (func) func(e)
}

export const handleChangeObj = (stateData: React.Dispatch<React.SetStateAction<SiteInputObjectType>>, func?: (e: ChangeEvent<HTMLInputElement>) => void) => (e: ChangeEvent<HTMLInputElement>) => {
  stateData(prev => ({ ...prev, value: e.target.value }))
  if (func) func(e)
}

// clickToggleList
export const clickToggleListArr = (stateData: React.Dispatch<React.SetStateAction<SiteInputsObjectType>>, func?: (e: ChangeEvent<HTMLInputElement>) => void) => (e: ChangeEvent<HTMLInputElement>) => {
  stateData(prev => prev.map(item =>
    item.name === e.target.name ?
      ({ ...item, isOpenList: !item.isOpenList }) :
      ({ ...item, isOpenList: false })
  ))

  if (func) func(e)
}

export const clickToggleListObj = (stateData: React.Dispatch<React.SetStateAction<SiteInputObjectType>>, func?: (e: ChangeEvent<HTMLInputElement>) => void) => (e: ChangeEvent<HTMLInputElement>) => {
  stateData(prev => ({ ...prev, isOpenList: !prev.isOpenList }))

  if (func) func(e)
}

// listItemOnClick
export const listItemOnClickArr = (stateData: React.Dispatch<React.SetStateAction<SiteInputsObjectType>>, func?: (e: ChangeEvent<HTMLInputElement>) => void, onlyFunc?: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
  if (!onlyFunc) {
    stateData(prev => prev.map(item => item.isOpenList === true ? ({
      ...item,
      value: e.target.innerHTML
    }) : item))
  }

  if (func) func(e)
}

export const listItemOnClickObj = (stateData: React.Dispatch<React.SetStateAction<SiteInputObjectType>>, func?: (e: ChangeEvent<HTMLInputElement>) => void) => (e: ChangeEvent<HTMLInputElement>) => {
  if (!func) {
    stateData(prev => prev.isOpenList === true ? ({
      ...prev,
      value: e.target.innerHTML
    }) : prev)
  } else {
    func(e)
  }
}

// imageChange
export const imageChangeArr = (stateData: React.Dispatch<React.SetStateAction<SiteInputsObjectType>>) => defaultImageChange(
  (reader) => {
    stateData(prev => prev.map(item => item.name === 'image' ? {
      ...item,
      value: reader.result as string
    } : item))
  }
)

export const imageChangeObj = (stateData: React.Dispatch<React.SetStateAction<DefaultObjectItemType>>) => defaultImageChange(
  (reader) => {
    stateData(prev => prev.name === 'image' ? ({
      ...prev,
      value: reader.result as string
    }) : prev)
  }
)

export const defaultImageChange = (func: (reader: any) => void) => (e: any) => {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = () => {
    if (e.target.files[0].size > 76800) {
      alert('Image too big, max. size 75kb!')
    } else {
      func(reader)
    }
  }
  reader.onerror = (err) => {
    console.log('Error: ', err)
  }
}