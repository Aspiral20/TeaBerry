import RootStore from "./index";
import { makeAutoObservable } from "mobx";
import { DefaultObjectItemType, SiteBkgItemType } from "../_types";
import React from "react";
import { ElementPropsConstructorType, ShopFilterType, StorePropsType } from "../_types/store/const_store_type";


const ElementPropsConstructor = (): ElementPropsConstructorType => {
  return {
    isFixed: false,
    height: 0,
    width: 0
  }
}

const stateStoreConstructor = (params: {
  stateName: string,
  state: any,
}) => {
  const { stateName, state } = params

  return {
    [stateName]: state,
  }
}

export default class ConstStore {
  rootStore: RootStore;

  props = {
    shopFilter: stateStoreConstructor({ stateName: 'isOpen', state: false } as { stateName: string, state: boolean }),
    header: ElementPropsConstructor(),
    footer: ElementPropsConstructor(),
    fonImage: {},
  } as StorePropsType & DefaultObjectItemType

  getData(nameFieldStore: string) {
    // check if field exists in props from store
    if (Object.keys(this.props).some(field => nameFieldStore.includes(field))) {
      return this.props[nameFieldStore]
    } else {
      throw new Error('Invalid \'Field\' name in store.constants.getData');
    }
  }

  setHeader(newProps: ElementPropsConstructorType) {
    this.props.header = { ...this.props.header, ...newProps };
  }

  setFooter(newProps: ElementPropsConstructorType) {
    this.props.footer = { ...this.props.footer, ...newProps };
  }

  setFonImage(newImageObj: SiteBkgItemType) {
    this.props.fonImage = newImageObj;
  }

  setShopFilter(newProps: ShopFilterType) {
    this.props.shopFilter = { ...this.props.shopFilter, ...newProps }
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

}
