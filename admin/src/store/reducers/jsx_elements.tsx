import { JSXElementsActionType, JSXElementsStateType } from "../../_types/store";

const initState: JSXElementsStateType = {
  header: { jsx: <></>, height: 0 },
  footer: { jsx: <></>, height: 0 }
}

const JSXElementsReducer = (state = initState, action: JSXElementsActionType) => {
  const { type, field, element, params } = action

  switch (type) {
    case `jsx_elements/${field}`:
      if (params) {
        return { ...state, [field]: { ...params, jsx: element } }
      } else {
        return { ...state, [field]: { jsx: element } }
      }
    default:
      return state
  }
}

export default JSXElementsReducer