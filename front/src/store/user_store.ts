import { IUser } from "../_types/services/user.type";
import { makeAutoObservable } from "mobx";
import RootStore from "./index";
import UserService from "../services/UserService";
import { v4 as uuid } from "uuid";
import { ArrayCommonDataType, DefaultObjectItemType } from "../_types";
import { toast } from "react-toastify";

export default class UserStore {
  rootStore: RootStore;
  user = {} as IUser;
  userList = [] as ArrayCommonDataType
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

  userStoreSetData = () => {
    const valuesUser = Object.values(this.user)
    const keysUser = Object.keys(this.user)

    this.userList = keysUser.map((item, i) => ({
      id: uuid(),
      field: item,
      value: valuesUser[i].toString()
    }))
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

  async updateUser(
    id: string,
    data: DefaultObjectItemType,
    statusMessage: { success: string, error: string }
  ) {
    const { success, error } = statusMessage
    try {
      this.setLoading(true)
      await UserService.updateUser(id, data);
      toast(success)
    } catch (e) {
      toast(error)
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }
}