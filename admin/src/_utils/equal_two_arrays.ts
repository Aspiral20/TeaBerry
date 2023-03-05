export default function equalTwoArrays (arr1: Array<any>, arr2: Array<any>) {

  /* Example:
   *
   * Case1:
   *   arr1: [
   *     'num', '123', 123
   *   ]
   *
   *   arr2: [
   *     'num', '123', 123
   *   ]
   * Case2:
   *   arr1: [
   *     'arr1', 'arr2', '123'
   *   ]
   *
   *   arr2: [
   *     'arr1', 'arr2', 123
   *   ]
   *
   * Result:
   * Case1: true
   * Case2: false
   *
   * */

  return JSON.stringify(arr1) === JSON.stringify(arr2)
}