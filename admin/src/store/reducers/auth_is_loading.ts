import { AuthIsLoadingActionType, AuthIsLoadingStateType } from "../../_types/store";

const initState: AuthIsLoadingStateType = {
  isLoading: false
}

const AuthIsLoadingReducer = async (state = initState, action: AuthIsLoadingActionType) => {
  const { type, isLoading } = action

  switch (type) {
    case `auth_is_loading`:
      return { ...state, isLoading: isLoading }
    default:
      return state
  }
}

export default AuthIsLoadingReducer