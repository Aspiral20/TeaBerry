import { DefaultObjectItemType } from "../_types/general";

export const PRODUCTS_LIMIT = 10;

export const ProductTypeFields: DefaultObjectItemType = {
  NAME: 'name',
  TYPE: 'type',
  BRAND: 'brand',
  PRICE: 'price',
  QUANTITY: 'quantity',
  STATUS: 'status',
  DESCRIPTION: 'description',
}

export const PRODUCTS_TYPES: DefaultObjectItemType = {
  TEA: 'tea',
  COFFEE: 'coffee',
}

export const PRODUCTS_BRANDS: DefaultObjectItemType = {
  tea: {
    OOLONG: "oolong",
    DARK: 'dark',
    WHITE: 'white',
    GREEN: 'green',
    MIXES: 'mixes',
  },
  coffee: {
    INFUSED: "infused",
    BOILED: "boiled",
    VACUUM: "vacuum",
    ESPRESSO: "espresso",
  },
}

export const PRODUCTS_STATUSES: DefaultObjectItemType = {
  ACTIVE: 'active',
  PENDING: 'pending',
  DISAPPROVED: 'disapproved',
  EXPIRED: 'expired',
}