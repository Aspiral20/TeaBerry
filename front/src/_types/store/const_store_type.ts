import { DefaultObjectItemType } from "../general";
import { SiteBkgItemType } from "../app_types";

export type ElementPropsType = {
  isFixed?: boolean
  height?: number
  width?: number
}

export type ShopFilterType = {
  isOpen: boolean
}

export type ElementPropsConstructorType = ElementPropsType & DefaultObjectItemType

export type StorePropsType = {
  shopFilter: ShopFilterType
  header: ElementPropsType
  footer: ElementPropsType
  fonImage: SiteBkgItemType
}