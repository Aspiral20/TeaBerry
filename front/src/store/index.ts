import AuthStore from "./auth_store";
import UserStore from "./user_store";
import LangStore from "./lang_store";
import ConstStore from "./const_store";

class RootStore {
  authStore: AuthStore
  userStore: UserStore
  langStore: LangStore
  constStore: ConstStore
  constructor() {
    this.authStore = new AuthStore(this)
    this.userStore = new UserStore(this)
    this.langStore = new LangStore(this)
    this.constStore = new ConstStore(this)
  }
}

export default RootStore
