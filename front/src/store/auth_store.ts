import { IUserDto } from "../_types/services/user.type";
import AuthService from "../services/AuthService";
import { makeAutoObservable } from "mobx";
import axios from 'axios';
import { AuthResponse } from "../_types/services/response/auth_response.type";
import { API_URL } from "../http";
import { toast } from "react-toastify";
import { ReqLoginDataType, ReqRegistrationDataType } from "../_types";
import RootStore from "./index";

export default class AuthStore {
  rootStore: RootStore

  user = {} as IUserDto;
  isAuth = false;
  isLoading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUserDto) {
    this.user = user
  }
  setLoading(bool: boolean) {
    this.isLoading = bool
  }
  async login(
    data: ReqLoginDataType,
    navigate: (to: string) => void,
    statusMessage: {success: string, error: string}
  ) {
    const {success, error} = statusMessage
    try {
      const { email, password } = data
      const res = await AuthService.login(email, password);
      console.log(res)

      localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user)

      toast(success)
      navigate('/profile/info')
    } catch (e: any) {
      toast.error(error)
      console.log(e)
    }
  }

  async registration(
    data: ReqRegistrationDataType,
    statusMessage: {success: string, error: string}
  ) {
    const {success, error} = statusMessage
    try {
      const res = await AuthService.registration(data)
      console.log(res)

      // localStorage.setItem('token', res.data.accessToken)
      // this.setAuth(true)
      // this.setUser(res.data.user)
      toast(success)
    } catch (e) {
      toast(error)
      console.log(e)
    }
  }

  async logout() {
    try {
      const res = await AuthService.logout();
      console.log(res)

      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUserDto)
    } catch (e) {
      console.log(e)
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true)
      const res = await AuthService.checkAuth();
      console.log({ resAuth: res })

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