import { combineReducers, createStore } from "redux";
import { AuthIsLoadingReducer, AuthReducer, JSXElementsReducer, SiteColorModeReducer, TogglesReducer } from './reducers'
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  SiteColorMode: SiteColorModeReducer,
  Toggles: TogglesReducer,
  JSXElements: JSXElementsReducer,
  Auth: AuthReducer,
  AuthIsLoading: AuthIsLoadingReducer
})

const store = createStore(reducers, composeWithDevTools())

export default store