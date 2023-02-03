import React, { FC, useContext, useEffect } from 'react';
import { AuthForm } from "../_components";
import { StoreContext } from "../index";

interface RegistrationProps {

}

const Registration: FC<RegistrationProps> = ({}) => {
  const { store } = useContext(StoreContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth().catch(err => console.log(err || "Something went wrong!"))
    }
  }, [])

  return (
    <div>
      <h2 className="title">Registration:</h2>
      <AuthForm type="registration"/>
      {store.isAuth && (
        <h1>User is authorized ${store.user.email}</h1>
      )}
    </div>
  );
};

export default Registration;