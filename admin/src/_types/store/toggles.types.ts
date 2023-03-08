import { DefaultObjectItemType } from "../general";

export type TogglesStateType = {
  select_feature: boolean
} & DefaultObjectItemType

export type TogglesActionType = {
  type: string
  field: string
}

export type TogglesReducerType = TogglesStateType & TogglesActionType