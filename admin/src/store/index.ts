import { combineReducers, createStore } from "redux";
import { SiteColorModeReducer, TogglesReducer } from './reducers'
import { composeWithDevTools } from "redux-devtools-extension";
import JSXElementsReducer from "./reducers/jsx_elements";

const reducers = combineReducers({
  SiteColorMode: SiteColorModeReducer,
  Toggles: TogglesReducer,
  JSXElements: JSXElementsReducer
})

const store = createStore(reducers, composeWithDevTools())

export default store