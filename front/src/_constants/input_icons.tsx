import cn from "classnames";
import { AddressIcon, CityIcon, CountryIcon, EmailIcon, PhoneIcon, SearchIcon, UserIcon } from "../_components";
import React from "react";
import { DefaultObjectItemType } from "../_types";
import { v4 as uuid } from "uuid";

interface cnEnumInputsIconsProps {
  active: string
  editing?: boolean
  cnParams?: DefaultObjectItemType
}

type iconProps = (active: string, editing?: boolean, cnParams?: DefaultObjectItemType) => JSX.Element
const cnEnumInputs = ({ active, editing, cnParams }: cnEnumInputsIconsProps) => cn(
  "auth_svg_icon", {
    is_value: editing !== undefined ? editing && active : active,
    ...cnParams
  }
)

type EnumInputIconType = {
  id: string,
  name: string,
  icon: iconProps
}

export const enumInputIcons: Array<EnumInputIconType> = [
  {
    id: uuid(),
    name: 'full_name',
    icon: (active, editing, cnParams) => <UserIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
  {
    id: uuid(),
    name: 'country',
    icon: (active, editing, cnParams) => <CountryIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
  {
    id: uuid(),
    name: 'city',
    icon: (active, editing, cnParams) => <CityIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
  {
    id: uuid(),
    name: 'address',
    icon: (active, editing, cnParams) => <AddressIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
  {
    id: uuid(),
    name: 'phone',
    icon: (active, editing, cnParams) => <PhoneIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
  {
    id: uuid(),
    name: 'email',
    icon: (active, editing, cnParams) => <EmailIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
  {
    id: uuid(),
    name: 'search',
    icon: (active, editing, cnParams) => <SearchIcon className={cnEnumInputs({ active, editing, cnParams })}/>
  },
]

export const enumUserData = [
  'full_name',
  'country',
  'city',
  'address',
  'phone',
  'email'
]

export const enumEditUserData = [
  'full_name',
  'country',
  'city',
  'address',
  'phone',
]