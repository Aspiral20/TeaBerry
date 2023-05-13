import React, { FC } from 'react';
// import { EditIcon, PasswordIcon, PasswordIconFilled } from "../../../../front/src/_components";
// import { enumInputIcons } from "../../../../front/src/_constants";
import cn from "classnames";
import { ArrowIcon } from "../icons";
import { SiteList } from "./index";

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
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void
  togglePasswd?: () => void
  isHiddenPasswd?: boolean,
  data: dataInputType
  editOnClick?: (e: any) => void
  showEditIcon?: boolean
  toggleList?: (e: any) => void
  listItemOnClickArr?: (e: any) => void
  imageChangeArr?: (e: any) => void
  toggleField?: boolean
}

const SiteInput: FC<SiteInputProps> = ({
  children,
  inputChildren,
  onChange,
  togglePasswd,
  isHiddenPasswd,
  data,
  editOnClick,
  showEditIcon,
  toggleList,
  listItemOnClickArr,
  imageChangeArr,
  toggleField,
}) => {
  const { name, value, description, placeholder, edit, title, list, isOpenList, file, maxSize, textarea, rowsTextarea, disabled, parentNameList, ...rest } = data

  return (
    <div className="auth_input_container">
      <div className="icon_input_container">
        {title && (
          <div className="title_input text">
            {title}:
          </div>
        )}

        {!list && !file && !textarea && (
          <input
            className={cn("auth_input text", {
              editing: edit !== undefined ? !edit : '',
              adaptive_padding: edit !== undefined,
              disabled: disabled
            })}
            name={name || undefined}
            onChange={onChange}
            value={value || ''}
            placeholder={placeholder}
            disabled={disabled ? disabled : edit !== undefined && !edit}
            required
            {...rest}
          />
        )}

        {file && (
          <label className="input_file_container auth_input text">
            <div className="input_file_button action_button text">Choose File</div> No file chosen
            <input
              className={cn("auth_input text", {
                editing: edit !== undefined ? !edit : '',
                adaptive_padding: edit !== undefined,
                withImage: value,
                disabled: disabled
              })}
              name={name || undefined}
              onChange={imageChangeArr}
              disabled={disabled ? disabled : edit !== undefined && !edit}
              required
              {...rest}
            />
            {maxSize && (
              <div className="input_file_max_size text">
                Max size: {maxSize}kb
              </div>
            )}

            {value && (
              <img className="input_image" src={value} alt="..."/>
            )}
          </label>
        )}

        {list && (
          <div className={cn("input_container", { active: isOpenList ? isOpenList : toggleField })} onClick={toggleList}>
            <input
              className={cn("auth_input auth_list text", {
                editing: edit !== undefined ? !edit : '',
                adaptive_padding: edit !== undefined
              })}
              name={name || undefined}
              value={value || ''}
              placeholder={placeholder}
              disabled={true}
              required
              {...rest}
            />
            <div className="arrow_input">
              <ArrowIcon className="theme_icon"/>
            </div>
            <div className="input_toggle_list">
              <SiteList
                data={list}
                parentNameList={parentNameList}
                listItemOnClickArr={listItemOnClickArr}
              />
            </div>
          </div>
        )}

        {textarea && (
          <textarea
            className={cn("site_textarea text", {
              disabled: disabled
            })}
            value={value || ''}
            name={name || undefined}
            placeholder={placeholder}
            disabled={disabled ? disabled : edit !== undefined && !edit}
            rows={rowsTextarea}
            onChange={onChange}
            {...rest}
          />
        )}

        {edit !== undefined && showEditIcon && (
          <div className={cn("svg_edit_container", { editing: edit })} id={name} onClick={editOnClick && editOnClick}>
            {/*<EditIcon className="svg_edit_icon" forAllId={name}/>*/}
            Edit
          </div>
        )}

        {/*{enumInputIcons.map(item => name === item.name ? (*/}
        {/*  <div className="auth_svg_toggle">*/}
        {/*    {item.icon(value, edit !== undefined && edit)}*/}
        {/*  </div>*/}
        {/*) : <></>)}*/}

        {name === 'password' && (
          <div className="auth_svg_toggle" onClick={togglePasswd}>
            {!isHiddenPasswd ? (
              // <PasswordIconFilled className={cn("auth_svg_icon", { is_value: value })}/>
              <>Is Hidden</>
            ) : (
              <>Is Shown</>
              // <PasswordIcon className={cn("auth_svg_icon", { is_value: value })}/>
            )}
          </div>
        )}

        {inputChildren}
      </div>

      {description && (
        <div className="auth_input_description">{description}</div>
      )}

      {children}
    </div>
  );
};

export default SiteInput;