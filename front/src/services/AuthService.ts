import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/auth_response.type";
import { ReqRegistrationDataType } from "../_types";

export default class AuthService {
  static async registration(data: ReqRegistrationDataType): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {...data})
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {email, password})
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}