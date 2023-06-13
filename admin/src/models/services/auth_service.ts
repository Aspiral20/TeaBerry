import $api, { API_URL } from "../../http";
import axios, { AxiosResponse } from 'axios';
import { AuthResponse, ReqRegistrationDataType } from "../../_types/auth";

export default class AuthService {
  static async registration(data: ReqRegistrationDataType): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/registration', { ...data })
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password })
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/logout')
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return axios.get<AuthResponse>(`${process.env.API_URL || API_URL}/refresh`, { withCredentials: true })
  }
}