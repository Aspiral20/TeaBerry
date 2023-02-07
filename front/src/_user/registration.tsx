import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { EmailIcon } from "../_components";
import { StoreContext } from "../index";
import cn from "classnames";
import PasswordIconFilled from "../_components/icons/password_icon_filled";
import PasswordIcon from "../_components/icons/password_icon";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import {
  ReqRegistrationDataType,
} from "../_types";
import { AuthInputType } from "../_types";
import UseValidPassword, { initPasswdConditions } from "../hooks/use_valid_password";
import PasswordValidation from "../_components/password_validation";
import toast from "react-hot-toast";

const initData: Array<AuthInputType> = [
  {
    id: uuid(),
    value: '',
    name: 'full_name',
    type: 'text',
    placeholder: 'auth_data.full_name',
  },
  {
    id: uuid(),
    value: '',
    name: 'country',
    type: 'text',
    placeholder: 'auth_data.country',
  },
  {
    id: uuid(),
    value: '',
    name: 'city',
    type: 'text',
    placeholder: 'auth_data.city',
  },
  {
    id: uuid(),
    value: '',
    name: 'address',
    type: 'text',
    placeholder: 'auth_data.address',
  },
  {
    id: uuid(),
    value: '',
    name: 'phone',
    type: 'text',
    placeholder: 'auth_data.phone',
  },
  {
    id: uuid(),
    value: '',
    name: 'email',
    type: 'text',
    placeholder: 'auth_data.email',
  },
  {
    id: uuid(),
    value: '',
    name: 'password',
    type: 'password',
    placeholder: 'auth_data.password',
  },
]
const initReqData: ReqRegistrationDataType = {
  full_name: '',
  country: '',
  city: '',
  address: '',
  phone: '',
  email: '',
  password: '',
}

const Registration: FC = () => {
  const { store } = useContext(StoreContext)
  const [isHiddenPasswd, setIsHoverPasswd] = useState(true)
  const [passIsValid, setPassIsValid] = useState(initPasswdConditions);
  const { t } = useTranslation()

  const [data, setData] = useState(initData)

  const togglePasswd = () => {
    setIsHoverPasswd(prev => !prev)
  }

  useEffect(() => {
    setData(prev => prev.map(item => item.name === 'password' ? {
      ...item,
      type: isHiddenPasswd ? 'password' : 'text'
    } : item))
  }, [isHiddenPasswd])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth().catch(err => console.log(err || "Something went wrong!"))
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassIsValid(UseValidPassword(e.target.value))
    }
    setData(prev => prev.map(item => item.name === e.target.name ? { ...item, value: e.target.value } : item))
  }

  const formSubmit = () => {
    const validReqPasswd = Object.values(passIsValid).every(item => item)
    if (validReqPasswd) {
      let reqData: ReqRegistrationDataType & { [p: string]: string } = initReqData;
      const reqDataKeys = Object.keys(reqData)

      data.forEach((item, i) => {
        if (item.name === reqDataKeys[i]) {
          reqData[item.name] = item.value
        }
      })

      store.registration(reqData)

      setData(initData)
    } else {
      toast.error('Invalid password!')
    }
  }

  return (
    <>
      {!store.isLoading ? (
        <div className="user_registration auth_user">
          <h2 className="auth_login title">{t('actions.registration')}</h2>
          <div className="auth_form">
            <div className="inputs_container">
              {data.map(({ id, name, value, placeholder, ...rest }) => (
                <div key={id} className="auth_input_container">
                  <div className="icon_input_container">
                    <input
                      key={id}
                      className="auth_input"
                      name={name}
                      onChange={handleChange}
                      placeholder={t(placeholder) || placeholder}
                      {...rest}
                    />
                    {name === 'email' && (
                      <div className="auth_svg_toggle">
                        <EmailIcon className={cn("auth_svg_icon", { is_value: value })}/>
                      </div>
                    )}
                    {name === 'password' && (
                      <button className="auth_svg_toggle" onClick={togglePasswd}>
                        {!isHiddenPasswd ? (
                          <PasswordIconFilled className={cn("auth_svg_icon", { is_value: value })}/>
                        ) : (
                          <PasswordIcon className={cn("auth_svg_icon", { is_value: value })}/>
                        )}
                      </button>
                    )}
                  </div>
                  <PasswordValidation password={passIsValid} show={!!value && name === 'password'} timeout={200}/>
                </div>
              ))}
            </div>

            <button
              className={cn("auth_submit button", { is_disabled: !data.every(item => item.value) })}
              type="submit"
              onClick={formSubmit}
              disabled={!data.every(item => item.value)}
            >
              {t('actions.submit')}
            </button>
          </div>

          {/*<AuthForm type="registration"/>*/}
          {store.isAuth && (
            <h1>User is authorized ${store.user.email}</h1>
          )}
        </div>
      ) : 'Loading...'}
    </>
  );
};

export default observer(Registration);