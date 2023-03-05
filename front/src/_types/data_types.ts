export type CommonDataType = {
  id: string
  field: string,
  value: string
}

export type ArrayCommonDataType = Array<CommonDataType>

export type ObjectDataType = {[p:string]: any}