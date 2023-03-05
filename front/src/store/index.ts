import AuthStore from "./auth_store";
import UserStore from "./user_store";
import LangStore from "./lang_store";

class RootStore {
  authStore: AuthStore
  userStore: UserStore
  langStore: LangStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.userStore = new UserStore(this)
    this.langStore = new LangStore(this)
  }
}

export default RootStore
