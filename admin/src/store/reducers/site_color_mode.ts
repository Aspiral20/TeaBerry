import { SiteColorModeActionType, SiteColorModeStateType } from "../../_types/store";

const LSSiteMode = localStorage.getItem('site_mode')

const initState: SiteColorModeStateType = {
  mode: LSSiteMode ? LSSiteMode : 'light'
}

const SiteColorModeReducer = (state = initState, action: SiteColorModeActionType) => {
  const { type, mode } = action

  switch (type) {
    case 'site_mode':
      return { ...state, mode: mode }
    default:
      return state
  }
}

export default SiteColorModeReducer