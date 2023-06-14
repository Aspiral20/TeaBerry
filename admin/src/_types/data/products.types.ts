import { DefaultObjectItemType } from "../general";

export type ProductType = {
  id: string
  name: string
  type: string
  brand: string
  price: number
  quantity: number
  status: string
  translation_key: string
  image?: string
  description?: string
} & DefaultObjectItemType

export type SearchFieldType = {
  field: string
  regex: string
}

export type ProductsType = Array<ProductType>

export type SiteInputObjectType = {
  id: string,
  value: any,
  name: string,
  type: string,
  placeholder?: string,
  title?: string,
  required?: boolean,
  parentNameList?: string
  list?: string[],
  isOpenList?: boolean
  file?: boolean
  maxSize?: number
  textarea?: boolean
  rowsTextarea?: number
  disabled?: boolean
}

export type SiteInputsObjectType = Array<SiteInputObjectType>

export type CountStatusesProductsType = Array<{
  status: string
  count: number
  percentage: number
  isHovered?: boolean
} & DefaultObjectItemType>