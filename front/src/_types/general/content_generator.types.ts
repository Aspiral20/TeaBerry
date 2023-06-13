export type ContentGeneratorItemType = {
  id: string
  name: string
  value?: string
  list?: Array<string>
  imgUrl?: string
  font?: boolean
}
export type ContentGeneratorDataType = (ContentGeneratorItemType)[
  ]
export type ContentGeneratorDataInType = {
  [p: string]: {
    [p: string]: ContentGeneratorDataType
  }
}