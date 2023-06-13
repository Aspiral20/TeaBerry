class Arrays {
  constructor() {
  }

  renameFieldObject = (obj, field, newField) => {

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

  renameFieldObjectArray = (arr, field, newField) => {

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
}

module.exports = new Arrays()