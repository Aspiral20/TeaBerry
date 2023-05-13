import axios, { AxiosResponse } from 'axios';
import { CountStatusesProductsType, SearchFieldType, UsersType, UserType } from "../../_types/data";
import { API_URL } from "../../http";

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<UsersType>> {
    return axios.get<UsersType>(`${process.env.API_URL || API_URL}/users`)
  }

  static async getUser(id: string): Promise<AxiosResponse<UserType>> {
    return axios.get<UserType>(`${process.env.API_URL || API_URL}/user?id=${id}`)
  }

  static async getAllStatusCountUsers(): Promise<AxiosResponse<CountStatusesProductsType>> {
    return axios.get<CountStatusesProductsType>(`${process.env.API_URL || API_URL}/users/statuses`)
  }

  static async searchUsers(data: SearchFieldType): Promise<AxiosResponse<UsersType>> {
    return axios.post<UsersType>(`${process.env.API_URL || API_URL}/user/search`, data)
  }

  static async updateUser(id: string, data: UserType) {
    return axios.post(`${process.env.API_URL || API_URL}/update_user?id=${id}`, data)
  }
}