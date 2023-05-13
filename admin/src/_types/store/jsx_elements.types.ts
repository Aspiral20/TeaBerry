import { DefaultObjectItemType } from "../general";
import React from "react";

type JSXElementsProp = {
  ref?: React.RefObject<React.ReactNode> | null
  height: number
  width: number
}

export type JSXElementsStateType = {
  header: JSXElementsProp
  footer: JSXElementsProp
} & DefaultObjectItemType

export type JSXElementsActionType = {
  type: string
  field: string
  ref: React.RefObject<React.ReactNode | HTMLElement>
  params: DefaultObjectItemType
}

export type JSXElementsReducerType = JSXElementsStateType & JSXElementsActionType