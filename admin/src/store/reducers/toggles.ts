import { TogglesActionType, TogglesStateType } from "../../_types/store";

const initState: TogglesStateType = {
  select_feature: false
}

const TogglesReducer = (state = initState, action: TogglesActionType) => {
  const { type, field } = action

  switch (type) {
    case 'toggles/open':
      return { ...state, [field]: true }
    case 'toggles/close':
      return { ...state, [field]: false }
    case 'toggles/toggle':
      return { ...state, [field]: !state[field] }
    default:
      return state
  }
}

export default TogglesReducer