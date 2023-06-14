import { AuthActionType, AuthStateType } from "../../_types/store";
import { IUserDto } from "../../_types/auth";
import { AuthService } from "../../models/services";
import store from "../index";

const initState: AuthStateType = {
  user: {} as IUserDto,
  isAuth: false,
  isLoading: false
}

const AuthReducer = async (state = initState, action: AuthActionType) => {
  const { type, statusMessage, registrationData, loginData, navigate } = action
  // const { success, error } = statusMessage

  switch (type) {
    case `auth/registration`:
      try {
        const res = await AuthService.registration(registrationData)
        console.log(res)

        // toast(success || "Success!")
      } catch (e) {
        // toast.error(error || "Something went wrong!")
        console.log(e)
      }
      return state
    case `auth/login`:
      try {
        const { email, password } = loginData
        const res = await AuthService.login(email, password);
        console.log(res)

        localStorage.setItem('token', res.data.accessToken);

        // toast(success || "Success!")
        navigate('/profile')

        return { ...state, isAuth: true, user: res.data.user }
      } catch (e: any) {
        // toast.error(error || "Something went wrong!")
        console.log(e)
      }
      return state
    case `auth/logout`:
      try {
        const res = await AuthService.logout();
        console.log(res)

        localStorage.removeItem('token');
        return { ...state, isAuth: false, user: {} as IUserDto }
      } catch (e) {
        console.log(e)
      }
      return state
    case `auth/checkAuth`:

      try {
        store.dispatch({type: 'auth_is_loading', isLoading: true})
        const res = await AuthService.checkAuth();
        console.log(res);

        localStorage.setItem('token', res.data.accessToken);
        return { ...state, setAuth: true, user: res.data.user };
      } catch (e) {
        console.log(e)
      } finally {
        store.dispatch({type: 'auth_is_loading', isLoading: false})
      }

      return state
    default:
      return state
  }
}

export default AuthReducer