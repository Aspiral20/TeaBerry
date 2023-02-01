import React, { FC, useContext, useState } from 'react';
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";

interface AuthForm {
  type: string
}

const AuthForm: FC<AuthForm> = ({ type }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(StoreContext)

  const authTypes = [
    { authType: 'login', action: () => store.login(email, password) },
    { authType: 'registration', action: () => store.registration(email, password) },
  ]

  // todo Validation

  return (
    <div className="auth_form">
      <div className="inputs_container">
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder={"Email"}
        />
        <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder={"Parola"}
        />
      </div>
      {authTypes.map(({ authType, action }) => authType === type && (
        <button onClick={action}>
          Submit
        </button>
      ))}
    </div>
  );
};

export default observer(AuthForm);