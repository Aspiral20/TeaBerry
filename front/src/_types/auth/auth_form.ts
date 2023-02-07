export type AuthInputType = {
  id: string;
  value: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder: string;
  description?: string;
}

export type ValidPasswdConditionsType = {
  symbol: boolean,
  number: boolean,
  uppercase: boolean,
  lowercase: boolean,
  minLength: boolean,
  maxLength: boolean,
}