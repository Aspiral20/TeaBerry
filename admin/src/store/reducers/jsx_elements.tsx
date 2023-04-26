import { JSXElementsActionType, JSXElementsStateType } from "../../_types/store";

const initState: JSXElementsStateType = {
  header: { ref: null, height: 0, width: 0 },
  footer: { ref: null, height: 0, width: 0 }
}

const JSXElementsReducer = (state = initState, action: JSXElementsActionType) => {
  const { type, field, ref, params } = action

  switch (type) {
    case `jsx_elements/`:
      if (field) {
        if (params) {
          return { ...state, [field]: { ...params, ref: ref } }
        } else {
          return { ...state, [field]: { ref: ref } }
        }
      }
      return state
    default:
      return state
  }
}

export default JSXElementsReducer