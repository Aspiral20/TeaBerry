import { IUser } from "../User.type";

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}