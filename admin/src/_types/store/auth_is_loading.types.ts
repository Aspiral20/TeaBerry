export type AuthIsLoadingStateType = {
  isLoading: boolean
}

export type AuthIsLoadingActionType = {
  type: string
  isLoading: boolean
}

export type AuthIsLoadingReducerType = AuthIsLoadingStateType & AuthIsLoadingActionType