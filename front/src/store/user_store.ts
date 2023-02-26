import { IUser } from "../models/user.type";
import { makeAutoObservable } from "mobx";
import RootStore from "./index";
import UserService from "../services/UserService";

export default class UserStore {
  rootStore: RootStore;
  user = {} as IUser;
  isLoading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  setUser(data: any) {
    this.user = data
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async fetchUser() {
    try {
      this.setLoading(true)
      const userId = this.rootStore.authStore.user.id
      const res = await UserService.fetchUser(userId)

      this.setUser(res.data)
    } catch (e) {
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }
}