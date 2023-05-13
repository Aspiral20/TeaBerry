import axios, { AxiosResponse } from 'axios';
import { CountStatusesProductsType, ProductsType, ProductType, SearchFieldType } from "../../_types/data";
import { API_URL } from "../../http";

export default class ProductsService {
  static async getProducts(): Promise<AxiosResponse<ProductsType>> {
    return axios.get<ProductsType>(`${process.env.API_URL || API_URL}/products`)
  }

  static async getProduct(id: string): Promise<AxiosResponse<ProductType>> {
    return axios.get<ProductType>(`${process.env.API_URL || API_URL}/product/${id}`)
  }

  static async getAllStatusCountProducts(): Promise<AxiosResponse<CountStatusesProductsType>> {
    return axios.get<CountStatusesProductsType>(`${process.env.API_URL || API_URL}/products/statuses`)
  }

  static async getStatusCountProducts(data: Array<string>): Promise<AxiosResponse<CountStatusesProductsType>> {
    return axios.post<CountStatusesProductsType>(`${process.env.API_URL || API_URL}/products/count_statuses`, data)
  }

  static async searchProducts(data: SearchFieldType): Promise<AxiosResponse<ProductsType>> {
    return axios.post<ProductsType>(`${process.env.API_URL || API_URL}/product/search`, data)
  }

  static async addProduct(data: ProductType) {
    return axios.post(`${process.env.API_URL || API_URL}/product/add`, data)
  }

  static async updateProduct(id: string, data: ProductType) {
    return axios.post(`${process.env.API_URL || API_URL}/product/update/${id}`, data)
  }

  static async removeProduct(id: string) {
    return axios.post(`${process.env.API_URL || API_URL}/product/remove/${id}`)
  }

  static async removeProducts(data: Array<string>) {
    console.log(data)
    return axios.post(`${process.env.API_URL || API_URL}/products/remove`, data)
  }
}