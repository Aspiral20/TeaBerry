import { SiteColorModeReducerType } from "./site_color_mode.types";
import { TogglesReducerType } from "./toggles.types";
import { JSXElementsReducerType } from "./jsx_elements.types";
import { AuthReducerType } from "./auth.types";
import { AuthIsLoadingReducerType } from "./auth_is_loading.types";

export type ReducersTypes = {
  SiteColorMode: SiteColorModeReducerType
  Toggles: TogglesReducerType
  JSXElements: JSXElementsReducerType
  Auth: AuthReducerType
  AuthIsLoading: AuthIsLoadingReducerType
}

export * from './site_color_mode.types'
export * from './toggles.types'
export * from './jsx_elements.types'
export * from './auth.types'
export * from './auth_is_loading.types'