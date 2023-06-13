import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser, IUserDto } from "../_types/services/user.type";
import { DefaultObjectItemType } from "../_types";
import { AuthResponse } from "../_types/services/response/auth_response.type";

export default class UserService {
  static fetchUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user/${id}`)
  }

  static updateUser(id: string, data: DefaultObjectItemType): Promise<AxiosResponse> {
    return $api.post(`/user/update/${id}`, data)
  }

  static sendDiscountMail(data: { email: string, discount: number }): Promise<AxiosResponse<{ discountCode: string }>> {
    return $api.post<{ discountCode: string }>('/user/mail_discount/', data)
  }

  static updateDiscount(id: string, data: { discount: number }): Promise<AxiosResponse> {
    return $api.post(`/user/discount/${id}`, data)
  }
}