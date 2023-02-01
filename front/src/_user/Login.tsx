import React, { FC, useContext, useEffect } from 'react';
import { AuthForm } from "../components";
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
// import UserService from "../services/UserService";
// import { IUser } from "../models/User.type";

const Login: FC = () => {
  const { store } = useContext(StoreContext);
  // const [users, setUsers] = useState<Array<IUser>>([]);

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

  console.log(store.isAuth)
  return (
    <div>
      {!store.isLoading ?
        <>
          <h2 className="title">Login:</h2>
          <AuthForm type="login"/>
          {store.isAuth && (
            <h1>User is authorized ${store.user.email}</h1>
          )}

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
        </>
        : 'Loading...'
      }
    </div>
  );
};

export default observer(Login);