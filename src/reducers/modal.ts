import {
  TOGGLE_MODAL,
  REMOVE_USER,
  EDIT_USER,
  CREATE_USER,
  SELECT_USER,
} from '../actions/actionTypes';

export default function (state: boolean = false, action: any) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return !state;
    case SELECT_USER:
      return true;
    case REMOVE_USER:
      return false;
    case EDIT_USER:
      return false;
    case CREATE_USER:
      return false;
    default:
      return state;
  }
}
