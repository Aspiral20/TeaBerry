import { DefaultObjectItemType } from "../general";
import React from "react";

type JSXElementsProp = {
  jsx: React.ReactNode
  height: number
}

export type JSXElementsStateType = {
  header: JSXElementsProp
  footer: JSXElementsProp
} & DefaultObjectItemType

export type JSXElementsActionType = {
  type: string
  field: string
  element: number
  params: DefaultObjectItemType
}

export type JSXElementsReducerType = JSXElementsStateType & JSXElementsActionType