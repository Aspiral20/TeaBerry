export default function getObjectFromTwoArrays(keyArr: Array<any>, valueArr: Array<any>) {
  // StartPoint:
  //  [key1,key2,key3],
  //  [value1,value2,value3]
  //
  // EndPoint: {
  //  key1: value1,
  //  key2: value2,
  //  key3: value3
  // }

  if (keyArr.length === valueArr.length) {
    return Object.fromEntries(keyArr.map((key,index) => [key, valueArr[index]]))
  } else {
    throw new Error(`Arrays should be the same length: ${{keyArr}}, ${{valueArr}}`)
  }
}