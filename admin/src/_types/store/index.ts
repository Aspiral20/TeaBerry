import { SiteColorModeReducerType } from "./site_color_mode.types";
import { TogglesReducerType } from "./toggles.types";

export type ReducersTypes = {
  SiteColorMode: SiteColorModeReducerType
  Toggles: TogglesReducerType
}

export * from './site_color_mode.types'
export * from './toggles.types'