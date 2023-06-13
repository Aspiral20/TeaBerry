export type LinksMenuDataType = Array<{
  id: string,
  name: string,
  translateKey: string,
  isOpen: boolean,
  children: Array<{ id: string, name: string, translateKey: string, link: string }>
}>