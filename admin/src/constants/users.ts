import { DefaultObjectItemType } from "../_types/general";

export const USERS_LIMIT = 10;

export const USERS_ROLES = {
  CEO: 'ceo',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SELLER: 'seller',
  OPERATOR: 'operator',
  CLIENT: 'client',
}

export const UserTypeFields: DefaultObjectItemType = {
  FULL_NAME: 'full_name',
  COUNTRY: 'country',
  CITY: 'city',
  ADDRESS: 'address',
  EMAIL: 'email',
  PHONE: 'phone',
  ROLE: 'role',
}