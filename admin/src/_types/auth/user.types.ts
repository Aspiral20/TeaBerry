export type IUser = {
  id: string
  full_name: string
  country: string
  city: string
  address: string
  phone: string
  email: string
  isActivated: boolean
}

export type IUserDto = {
  id: string
  email: string
  isActivated: boolean
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUserDto
}

export type ReqRegistrationDataType = {
  full_name: string;
  country: string;
  city: string;
  address: string
  phone: string;
  email: string;
  password: string;
}

export type ReqLoginDataType = {
  email: string
  password: string
}