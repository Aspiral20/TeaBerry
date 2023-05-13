import { DefaultObjectItemType } from "../_types/general";

export function equalObjects (obj1: DefaultObjectItemType, obj2: DefaultObjectItemType) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export function equalArrays (arr1: Array<any>, arr2: Array<any>) {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}