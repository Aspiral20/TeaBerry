import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/user.type";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<Array<IUser>>> {
    return $api.get<Array<IUser>>('/users')
  }
}