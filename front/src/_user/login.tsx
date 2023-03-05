import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { PasswordValidation, SiteInput } from "../_components";
import { ReqLoginDataType, AuthInputType } from "../_types";
import UseValidPassword, { initPasswdConditions } from "../hooks/use_valid_password";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isHiddenPasswd, setIsHoverPasswd] = useState(true)
  const [passIsValid, setPassIsValid] = useState(initPasswdConditions);
  const { t } = useTranslation()
  // const [users, setUsers] = useState<Array<IUser>>([]);
  const [data, setData] = useState(initData)
  const [isDisabled, setIsDisabled] = useState(true)
  const validReqPasswd = Object.values(passIsValid).every(item => item)
  const [validEmail, setValidEmail] = useState(false);

  const togglePasswd = () => {
    setIsHoverPasswd(prev => !prev)
  }

  useEffect(() => {
    setIsDisabled(!data.every(item => item.value))
  }, [data])

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
    if (e.target.name === 'email') {
      setValidEmail(!e.target.value.includes('@'))
    }
    setData(prev => prev.map(item => item.name === e.target.name ? { ...item, value: e.target.value } : item))
  }

  useEffect(() => {
    setData(prev => prev.map(item => item.name === 'password' ? {
      ...item,
      type: isHiddenPasswd ? 'password' : 'text'
    } : item))
  }, [isHiddenPasswd])

  useEffect(() => {}, [navigate])   //After user is logged, fetch data in profile

  const formSubmit = (e: any) => {
    e.preventDefault()

    const reqData: { [p: string]: string } & ReqLoginDataType = initReqData

    const reqDataKeys = Object.keys(reqData)

    data.forEach((item, i) => {
      if (item.name === reqDataKeys[i]) {
        reqData[item.name] = item.value
      }
    })

    const navigation = (to: string) => {
      navigate(to)
    }

    store.authStore.login(
      reqData,
      navigation,
      {
        success: t('actions.success-logged'),
        error: t('actions.was-not-found')
      }
    )

    setData(initData)
  }
  // console.log(store.isAuth)
  return (
    <>
      {!store.authStore.isLoading ? (
        <div className="user_login auth_user">
          <div className="auth_login title">{t('actions.login')}</div>

          <form className="auth_form" onSubmit={formSubmit}>
            <div className="inputs_container">
              {data.map(({ id, name, description, value, ...rest }) => (
                <SiteInput
                  key={id}
                  onChange={handleChange}
                  data={{ id, name, description, value, ...rest }}
                  togglePasswd={togglePasswd}
                  isHiddenPasswd={isHiddenPasswd}
                >
                  <PasswordValidation
                    password={passIsValid}
                    show={!!value && name === 'password' && !validReqPasswd}
                    timeout={200}
                  />
                </SiteInput>
              ))}
            </div>
            <div className="forgot_password">
              <Link className="forgot_password_text text" to="/user/forgot_password">
                {t('auth.forgot_password')}?
              </Link>
            </div>
            <button
              className={cn("auth_submit auth_button button", { is_disabled: !validReqPasswd || isDisabled || validEmail })}
              disabled={!validReqPasswd || isDisabled || validEmail}
            >
              {t('actions.submit')}
            </button>
            <div className="sign_up">
              <div className="sign_up_text text">
                {t('auth.not_a_member')}
              </div>
              ?&nbsp;
              <Link className="sign_up_link text" to="/auth/registration">
                {t('actions.registration')}
              </Link>
            </div>
          </form>

          {/*{store.isAuth && (*/}
          {/*  <h1>User is authorized,user: ${store.user.email}</h1>*/}
          {/*)}*/}

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