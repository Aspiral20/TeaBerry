import { AxiosResponse } from "axios";
import $api from "../http";
import { GetProductsProps, ProductsType, ProductType, SearchProps } from "../_types/services/product.type";
import { DefaultObjectItemType, FilterType, SortType } from "../_types";

export default class ProductService {
  static async getProducts(params?: GetProductsProps): Promise<AxiosResponse<ProductsType>> {
    if (params) {
      const { sort, condition } = params

      if (sort) {
        return $api.get<ProductsType>(`/product/all/${params.sort}`)
      } else if (condition) {
        return $api.post<ProductsType>(`/product/all`, { condition })
      } else {
        return $api.get<ProductsType>('/product/all')
      }
    } else {
      return $api.get<ProductsType>('/product/all')
    }
  }

  static async getProduct(id: string): Promise<AxiosResponse<ProductType>> {
    return $api.get<ProductType>(`/product/${id}`)
  }

  static async searchProducts(data: SearchProps) {
    return $api.post<ProductsType>('/product/search', data)
  }

  static async filterProducts(data?: { sort: SortType, filter: FilterType }): Promise<AxiosResponse<ProductsType>> {
    return $api.post<ProductsType>('/product/all/filter', data)
  }
}