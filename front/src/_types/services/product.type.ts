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

export type ProductsType = Array<ProductType>

export interface SearchProps {
  field: string,
  regex: string,
  sort?: string,
}

export interface GetProductsProps {
  sort?: string
  condition?: DefaultObjectItemType
}

