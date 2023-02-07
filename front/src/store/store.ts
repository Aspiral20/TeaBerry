import { IUser } from "../models/user.type";
import AuthService from "../services/AuthService";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import { AuthResponse } from "../models/response/auth_response.type";
import { API_URL } from "../http";
import toast from "react-hot-toast";
import { ReqRegistrationDataType, ReqLoginDataType } from "../_types";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async login(data: ReqLoginDataType) {
    try {
      const {email, password} = data
      const res = await AuthService.login(email, password);

      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user)
      toast('Success!')
    } catch (e:any) {
      toast.error(e || 'Something went wrong!')
      console.log(e)
    }
  }

  async registration(data: ReqRegistrationDataType) {
    try {
      const {email, password} = data
      const res = await AuthService.registration(email, password);
      console.log(res)

      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      const res = await AuthService.logout();
      console.log(res)

      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e)
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true)
      const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      console.log(res)

      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user)
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }
}