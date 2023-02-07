import { ValidPasswdConditionsType } from "../_types";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from "../_constants";

export const initPasswdConditions: ValidPasswdConditionsType = {
  symbol: false,
  number: false,
  uppercase: false,
  lowercase: false,
  minLength: false,
  maxLength: true,
}
const UseValidPassword = (password: string) => {

  return {
    symbol: /[!%@#$^&*?_~-]/.test(password),
    number: /[0-9]/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    minLength: password.length >= MIN_PASSWORD_LENGTH,
    maxLength: password.length <= MAX_PASSWORD_LENGTH
  }
}

export default UseValidPassword;