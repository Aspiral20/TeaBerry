import { combineReducers, createStore } from "redux";
import { SiteColorModeReducer, TogglesReducer } from './reducers'
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  SiteColorMode: SiteColorModeReducer,
  Toggles: TogglesReducer,
})

const store = createStore(reducers, composeWithDevTools())

export default store