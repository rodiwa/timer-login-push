import { APP_ACTIONS } from '../actions/types'

const INITIAL_STATE = {
  isEditing: false
}

export const AppStateReducer = (state=INITIAL_STATE, action) => {
  const { EDIT_MODE_ON, EDIT_MODE_OFF, /* ADD_NEW_TIMER_TO_LIST */ } = APP_ACTIONS

  switch (action.type) {
    case EDIT_MODE_ON:
      return Object.assign({}, state, { isEditing: true })
    case EDIT_MODE_OFF:
      return Object.assign({}, state, { isEditing: false })
    // case ADD_NEW_TIMER_TO_LIST: // TODO: move from login to here
    default:
      return state
  }
}
