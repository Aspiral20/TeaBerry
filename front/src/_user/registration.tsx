import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { SiteInput } from "../_components";
import { StoreContext } from "../index";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import {
  ReqRegistrationDataType,
} from "../_types";
import { AuthInputType } from "../_types";
import UseValidPassword, { initPasswdConditions } from "../hooks/use_valid_password";
import PasswordValidation from "../_components/password_validation";
import { ToastContainer } from 'react-toastify';

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
  const { t } = useTranslation()
  const [isHiddenPasswd, setIsHoverPasswd] = useState(true)
  const [passIsValid, setPassIsValid] = useState(initPasswdConditions);
  const [isDisabled, setIsDisabled] = useState(true)
  const validReqPasswd = Object.values(passIsValid).every(item => item)
  const [validEmail, setValidEmail] = useState(false);

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
    setIsDisabled(!data.every(item => item.value))
  }, [data])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassIsValid(UseValidPassword(e.target.value))
    }
    if (e.target.name === 'email') {
      setValidEmail(!e.target.value.includes('@'))
    }
    setData(prev => prev.map(item => item.name === e.target.name ? { ...item, value: e.target.value } : item))
  }


  const formSubmit = (e: any) => {
    e.preventDefault()
    let reqData: ReqRegistrationDataType & { [p: string]: string } = initReqData;
    const reqDataKeys = Object.keys(reqData)

    data.forEach((item, i) => {
      if (item.name === reqDataKeys[i]) {
        reqData[item.name] = item.value
      }
    })

    store.authStore.registration(
      reqData,
      {
        success: t('auth.successful_registration.check_email'),
        error: "Something went wrong!" || t('actions.user-exists')
      }
    )

    setData(initData)
  }

  return (
    <>
      {!store.authStore.isLoading ? (
        <div className="user_registration auth_user">
          <h2 className="auth_login title">{t('actions.registration')}</h2>
          <form className="auth_form" onSubmit={formSubmit}>
            <div className="inputs_container">
              {data.map(({ id, name, value, ...rest }) => (
                <SiteInput
                  key={id}
                  onChange={handleChange}
                  data={{ id, name, value, ...rest }}
                  togglePasswd={togglePasswd}
                  isHiddenPasswd={isHiddenPasswd}
                >
                  <PasswordValidation
                    password={passIsValid}
                    show={!!value && name === 'password' && !validReqPasswd}
                    timeout={200}
                  />
                  <PasswordValidation password={passIsValid} show={!!value && name === 'password'} timeout={200}/>
                </SiteInput>
              ))}
            </div>
            <button
              className={cn("auth_submit auth_button button", { is_disabled: !validReqPasswd || isDisabled || validEmail })}
              disabled={!validReqPasswd || isDisabled || validEmail}
            >
              {t('actions.submit')}
            </button>
          </form>
          <ToastContainer/>
        </div>
      ) : 'Loading...'}
    </>
  );
};

export default observer(Registration);