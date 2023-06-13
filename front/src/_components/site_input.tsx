import React, { FC } from 'react';
import { EditIcon, PasswordIcon, PasswordIconFilled } from "./icons";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { enumInputIcons } from "../_constants";

type dataInputType = {
  name: string;
  value: string;
  type: string;
  description?: string;
  edit?: boolean;
} & { [param: string]: any }

interface SiteInputProps {
  children?: React.ReactNode
  inputChildren?: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  data: dataInputType
  setData?: React.Dispatch<React.SetStateAction<dataInputType[]>>
  togglePasswd?: () => void
  isHiddenPasswd?: boolean,
  editOnClick?: (e: any) => void
  showEditIcon?: boolean
  isFilterEffect?: boolean
}

const SiteInput: FC<SiteInputProps> = ({
  children,
  inputChildren,
  onChange,
  data,
  togglePasswd,
  isHiddenPasswd,
  editOnClick,
  showEditIcon,
  isFilterEffect,
}) => {
  const { name, value, description, placeholder, edit, ...rest } = data
  const { t } = useTranslation();

  return (
    <div className="auth_input_container">
      <div className="icon_input_container">
        <input
          className={cn("auth_input", {
            editing: edit !== undefined ? !edit : '',
            adaptive_padding: edit !== undefined,
            filter_effect: isFilterEffect
          })}
          name={name || undefined}
          onChange={onChange}
          value={value || ''}
          placeholder={placeholder && t(placeholder)}
          disabled={edit !== undefined && !edit}
          required
          {...rest}
        />

        {edit !== undefined && showEditIcon && (
          <div className={cn("svg_edit_container", {
            editing: edit
          })} id={name} onClick={editOnClick && editOnClick}>
            <EditIcon className={cn("svg_edit_icon", {
              filter_effect: isFilterEffect
            })} forAllId={name}/>
          </div>
        )}

        {enumInputIcons.map((item, index) => name === item.name ? (
          <div key={item.id} className={cn("auth_svg_toggle")}>
            {item.icon(value, edit, { filter_effect: isFilterEffect })}
          </div>
        ) : <></>)}

        {name === 'password' && (
          <div className="auth_svg_toggle" onClick={togglePasswd}>
            {!isHiddenPasswd ? (
              <PasswordIconFilled
                className={cn("auth_svg_icon", {
                  is_value: value,
                  filter_effect: isFilterEffect
                })}/>
            ) : (
              <PasswordIcon
                className={cn("auth_svg_icon", {
                  is_value: value,
                  filter_effect: isFilterEffect
                })}/>
            )}
          </div>
        )}

        {inputChildren}
      </div>

      {description && (
        <div className="auth_input_description">{t(description)}</div>
      )}

      {children}
    </div>
  );
};

export default SiteInput;