import { DefaultObjectItemType, DefaultObjectsItemType } from "../_types";

export const renameFieldObject = (obj: DefaultObjectItemType, field: string, newField: string) => {

  /*
   *
   * Example:
   *
   * obj = {
   *   field: 1
   * }
   *
   * Result:
   *
   * obj = {
   *   newField: 1
   * }
   *
   */

  return delete Object.assign(obj, { [newField]: obj[field] })[field];
}

export const renameFieldObjectArray = (arr: DefaultObjectsItemType, field: string, newField: string) => {

  /*
   * Example:
   *
   * obj = [{ field: 1 }, { field: 2 }]
   *
   * Result:
   *
   * obj = [{ newField: 1 }, { newField: 2 }]
   *
   */

  return arr.map(obj => delete Object.assign(obj, { [newField]: obj[field] })[field]);
}