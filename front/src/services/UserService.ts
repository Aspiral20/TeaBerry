import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser, IUserDto } from "../models/user.type";

export default class UserService {
  // todo "to admin fetch users"
  static fetchUsers(): Promise<AxiosResponse<Array<IUserDto>>> {
    return $api.get<Array<IUserDto>>('/users')
  }

  static fetchUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user/${id}`)
  }
}