import RootStore from "./index";
import { makeAutoObservable } from "mobx";

export const langs = [
  { key: 'en', lang: 'EN' },
  { key: 'ro', lang: 'RO' },
  { key: 'ru', lang: 'RU' },
]

export default class LangStore {
  rootStore: RootStore;
  lang = '';
  toggleLang = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  setLang = (lang: string) => {
    this.lang = lang
  }

  setToggleLang = (toggle: boolean) => {
    this.toggleLang = toggle
  }

}