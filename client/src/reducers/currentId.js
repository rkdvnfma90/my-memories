import { SET_CURRENT_ID } from '../constants/actionTypes'

const currentId = (state = { currentId: null }, action) => {
  switch (action.type) {
    case SET_CURRENT_ID:
      return { ...state, currentId: action?.payload }
    default:
      return state
  }
}

export default currentId
