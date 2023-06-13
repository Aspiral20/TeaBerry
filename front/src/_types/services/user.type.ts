export type IUser = {
  id: string
  full_name: string
  country: string
  city: string
  address: string
  phone: string
  email: string
  role: string
  discount: number
  isActivated: boolean
}

export type IUserDto = {
  id: string
  email: string
  isActivated: boolean
}