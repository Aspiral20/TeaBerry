import axios, { AxiosResponse } from 'axios';
import { CountStatusesProductsType, ProductsType, ProductType, SearchFieldType } from "../../_types/data";
import $api, { API_URL } from "../../http";
export default class ProductsService {
  static async getProducts(): Promise<AxiosResponse<ProductsType>> {
    return $api.get<ProductsType>(`/product/all`)
  }

  static async getProduct(id: string): Promise<AxiosResponse<ProductType>> {
    return $api.get<ProductType>(`/product/${id}`)
  }

  static async getAllStatusCountProducts(): Promise<AxiosResponse<CountStatusesProductsType>> {
    return $api.get<CountStatusesProductsType>(`/product/all/statuses`)
  }

  static async getStatusCountProducts(data: Array<string>): Promise<AxiosResponse<CountStatusesProductsType>> {
    return $api.post<CountStatusesProductsType>(`/product/all/count_statuses`, data)
  }

  static async searchProducts(data: SearchFieldType): Promise<AxiosResponse<ProductsType>> {
    return $api.post<ProductsType>(`/product/search`, data)
  }

  static async addProduct(data: ProductType) {
    return $api.post(`/product/add`, data)
  }

  static async updateProduct(id: string, data: ProductType) {
    return $api.post(`/product/update/${id}`, data)
  }

  static async removeProduct(id: string) {
    return $api.post(`/product/remove/${id}`)
  }

  static async removeProducts(data: Array<string>) {
    console.log(data)
    return $api.post(`/product/all/remove`, data)
  }
}