export type SiteColorModeStateType = {
  mode: string
}

export type SiteColorModeActionType = {
  type: string
  mode: string
}

export type SiteColorModeReducerType = SiteColorModeStateType & SiteColorModeActionType