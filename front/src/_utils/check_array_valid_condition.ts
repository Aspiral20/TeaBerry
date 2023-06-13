export const checkValid = (arr: Array<any>, checkField: string, withCheck: string) => {
  return arr.some(item => item[checkField] === withCheck)
}