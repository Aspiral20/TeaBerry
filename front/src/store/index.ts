import AuthStore from "./auth_store";
import UserStore from "./user_store";
import { makeAutoObservable } from "mobx";

class RootStore {
  authStore: AuthStore
  userStore: UserStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.userStore = new UserStore(this)
  }
}

export default RootStore
