export default function getObjectFromTwoArrays(arr1: Array<any>, arr2: Array<any>) {
  // StartPoint: [
  //  [key1,key2,key3],
  //  [value1,value2,value3]
  // ]
  // EndPoint: {
  //  key1: value1,
  //  key2: value2,
  //  key3: value3
  // }

  if (arr1.length === arr2.length) {
    //@ts-ignore
    return Object.assign(...arr1.map((el,index) => ({[el]: arr2[index]})))
  } else {
    throw new Error(`Arrays should be the same length: ${{arr1}}, ${{arr2}}`)
  }
}