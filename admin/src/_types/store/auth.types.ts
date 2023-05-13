import { IUserDto, ReqLoginDataType, ReqRegistrationDataType } from "../auth";

export type AuthStateType = {
  user: IUserDto
  isAuth: boolean
  isLoading: boolean
}

export type AuthActionType = {
  type: string
  registrationData: ReqRegistrationDataType
  loginData: ReqLoginDataType
  navigate: (to: string) => void
  statusMessage: { success: string, error: string }
}

export type AuthReducerType = AuthStateType & AuthActionType