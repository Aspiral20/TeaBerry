import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser, IUserDto } from "../models/user.type";
import { ObjectDataType } from "../_types";

export default class UserService {
  // todo "to admin fetch users"
  static fetchUsers(): Promise<AxiosResponse<Array<IUserDto>>> {
    return $api.get<Array<IUserDto>>('/users')
  }

  static fetchUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user/${id}`)
  }

  static updateUser(id: string, data: ObjectDataType): Promise<AxiosResponse> {
    return $api.post(`/update_user/${id}`, data)
  }
}