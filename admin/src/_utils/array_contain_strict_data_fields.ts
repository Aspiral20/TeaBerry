import equalTwoArrays from "./equal_two_arrays";

const ArrayContainStrictDataFields = (arrayData: Array<any>, fields: Array<any>) => {

  /* Example:
   *
   * arrayData: [
   *   {},
   *   {obj1: ''},
   *   {obj1: '', obj3: ''},
   *   {obj1: '', obj2: ''}
   * ]
   *
   * fields: [
   *   'obj1',
   *   'obj2'
   * ]
   *
   * Result: [
   *   {obj1: '', obj2: ''}
   * ]
   *
   * */
  console.log({arrayData, fields})

  return arrayData.filter(item => equalTwoArrays(Object.keys(item), fields))
}

export default ArrayContainStrictDataFields;