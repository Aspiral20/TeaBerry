import { DefaultObjectItemType } from "../_types/general";

export const fieldIsTrue = (
  arr: Array<DefaultObjectItemType>,
  field: string
) => arr.filter(item => item[field]).length > 0