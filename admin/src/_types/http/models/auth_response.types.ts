import { IUserDto } from "../../auth";

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUserDto
}