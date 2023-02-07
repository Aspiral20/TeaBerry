import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import PasswordIcon from "../_components/icons/password_icon";
import cn from "classnames";
import { EmailIcon } from "../_components";
import PasswordIconFilled from "../_components/icons/password_icon_filled";
import { ReqLoginDataType, AuthInputType } from "../_types";
import PasswordValidation from "../_components/password_validation";
import toast from "react-hot-toast";
import UseValidPassword, { initPasswdConditions } from "../hooks/use_valid_password";
// import UserService from "../services/UserService";
// import { IUser } from "../models/User.type";

const initData: Array<AuthInputType> = [
  {
    id: uuid(),
    value: '',
    name: 'email',
    type: 'text',
    placeholder: 'Email',
  },
  {
    id: uuid(),
    value: '',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
]
const initReqData: ReqLoginDataType = {
  email: '',
  password: '',
}

const Login: FC = () => {
  const { store } = useContext(StoreContext);
  const [isHiddenPasswd, setIsHoverPasswd] = useState(true)
  const [passIsValid, setPassIsValid] = useState(initPasswdConditions);
  const { t } = useTranslation()
  // const [users, setUsers] = useState<Array<IUser>>([]);
  const [data, setData] = useState(initData)

  const togglePasswd = () => {
    setIsHoverPasswd(prev => !prev)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth().catch(err => console.log(err || "Something went wrong!"))
    }
  }, [])

  // async function getUsers() {
  //   try {
  //     const res = await UserService.fetchUsers()
  //     setUsers(res.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassIsValid(UseValidPassword(e.target.value))
    }
    setData(prev => prev.map(item => item.name === e.target.name ? { ...item, value: e.target.value } : item))
  }

  useEffect(() => {
    setData(prev => prev.map(item => item.name === 'password' ? {
      ...item,
      type: isHiddenPasswd ? 'password' : 'text'
    } : item))
  }, [isHiddenPasswd])

  const formSubmit = () => {
    const validReqPasswd = Object.values(passIsValid).every(item => item)
    if (validReqPasswd) {
      const reqData: ReqLoginDataType & { [p: string]: string } = initReqData
      const reqDataKeys = Object.keys(reqData)

      data.forEach((item, i) => {
        if (item.name === reqDataKeys[i]) {
          reqData[item.name] = item.value
        }
      })

      store.login(reqData)

      setData(initData)
    } else {
      toast.error('Invalid password!')
    }
  }

  console.log(store.isAuth)
  return (
    <>
      {!store.isLoading ? (
        <div className="user_login auth_user">
          <div className="auth_login title">{t('actions.login')}</div>

          <div className="auth_form">
            <div className="inputs_container">
              {data.map(({ id, name, description, value, ...rest }) => (
                <div key={id} className="auth_input_container">
                  <div className="icon_input_container">
                    <input
                      key={id}
                      className="auth_input"
                      name={name}
                      onChange={handleChange}
                      required
                      {...rest}
                    />
                    {description && (
                      <div className="auth_input_description">{t(description)}</div>
                    )}
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

          {store.isAuth && (
            <h1>User is authorized ${store.user.email}</h1>
          )}

          {/*{store.isLoading ? <>Loading...</> : <></>}*/}

          {/*<div>*/}
          {/*  <h1>{store.user.isActivated ? 'Account approved' : 'Approve your account on email!!!'}</h1>*/}
          {/*  <div>*/}
          {/*    <button onClick={getUsers}>Get users</button>*/}
          {/*  </div>*/}
          {/*  {users.map(user => (*/}
          {/*    <div key={user.email}>*/}
          {/*      {user.email}*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      ) : 'Loading...'}
    </>
  );
};

export default observer(Login);