import cn from "classnames";
import { AddressIcon, CityIcon, CountryIcon, EmailIcon, PhoneIcon, UserIcon } from "../_components";
import React from "react";

interface cnEnumInputsIconsProps {
  active: string,
  editing?: boolean
}

type iconProps = (active: string, editing?: boolean) => JSX.Element
const cnEnumInputs = ({ active, editing }: cnEnumInputsIconsProps) => cn(
  "auth_svg_icon", {
    is_value: editing !== undefined ? editing && active : active,
  }
)

export const enumInputIcons: Array<{ [p: string]: any } & {icon: iconProps}> = [
  {
    name: 'full_name',
    icon: (active, editing) => <UserIcon className={cnEnumInputs({ active, editing })}/>
  },
  {
    name: 'country',
    icon: (active, editing) => <CountryIcon className={cnEnumInputs({ active, editing })}/>
  },
  {
    name: 'city',
    icon: (active, editing) => <CityIcon className={cnEnumInputs({ active, editing })}/>
  },
  {
    name: 'address',
    icon: (active, editing) => <AddressIcon className={cnEnumInputs({ active, editing })}/>
  },
  {
    name: 'phone',
    icon: (active, editing) => <PhoneIcon className={cnEnumInputs({ active, editing })}/>
  },
  {
    name: 'email',
    icon: (active, editing) => <EmailIcon className={cnEnumInputs({ active, editing })}/>
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