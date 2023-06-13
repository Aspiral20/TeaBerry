import { AxiosResponse } from 'axios';
import { CountStatusesProductsType, SearchFieldType, UsersType, UserType } from "../../_types/data";
import $api, { API_URL } from "../../http";

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<UsersType>> {
    return $api.get<UsersType>(`/user/all`)
  }

  static async getUser(id: string): Promise<AxiosResponse<UserType>> {
    return $api.get<UserType>(`/user?id=${id}`)
  }

  static async getAllStatusCountUsers(): Promise<AxiosResponse<CountStatusesProductsType>> {
    return $api.get<CountStatusesProductsType>(`/user/all/statuses`)
  }

  static async searchUsers(data: SearchFieldType): Promise<AxiosResponse<UsersType>> {
    return $api.post<UsersType>(`/user/search`, data)
  }

  static async updateUser(id: string, data: UserType) {
    return $api.post(`/user/update/${id}`, data)
  }
}