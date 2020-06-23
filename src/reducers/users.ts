import {
  CREATE_USER,
  EDIT_USER,
  REMOVE_USER,
  SELECT_USER,
  CHANGE_ORDER,
  INCREMENT_TOUSER,
} from '../actions/actionTypes';
import { List } from 'immutable';
import users from '../assets/users.json';

let usersList = List(
  users.map((u, i) => ({ ...u, id: i, age: 21 })),
).sort((a, b) => a.name.localeCompare(b.name));

export interface User {
  name: string;
  surname: string;
  connectedUsers: number;
  description: string;
  image: string | null;
  id: number;
  age: number;
}

const initialState = {
  userList: usersList.slice(0, 15),
  orderBy: 'name',
  toUser: 15,
  nextId: usersList.size + 1,
};

interface State {
  userList: List<User>;
  toUser: number;
  orderBy: string;
  currUser?: User;
  nextId: number;
}

export default function (
  state: State = initialState,
  action: { type: string; orderBy: string; user: User },
) {
  const user = action.user;
  switch (action.type) {
    case CREATE_USER:
      usersList = usersList
        .push({ ...user, id: state.nextId })
        .sort(compareBy(state.orderBy));
      return {
        ...state,
        userList: usersList.slice(0, state.toUser),
        nextId: state.nextId + 1,
      };
    case EDIT_USER:
      usersList = usersList
        .map((u) => {
          if (u.id === user.id) return user;
          return u;
        })
        .sort(compareBy(state.orderBy));
      return {
        ...state,
        userList: usersList.slice(0, state.toUser),
      };
    case REMOVE_USER:
      usersList = usersList.filter((u) => u.id !== user.id);
      return {
        ...state,
        userList: usersList.slice(0, state.toUser),
      };
    case INCREMENT_TOUSER:
      return {
        ...state,
        toUser: state.toUser + 15,
        userList: usersList.slice(0, state.toUser + 15),
      };
    case CHANGE_ORDER:
      usersList = usersList.sort(compareBy(action.orderBy));
      return {
        ...state,
        orderBy: action.orderBy,
        userList: usersList.slice(0, state.toUser),
      };
    case SELECT_USER:
      return {
        ...state,
        currUser: user,
      };
    default:
      return state;
  }
}

function compareBy(orderBy: string) {
  return (a: User, b: User) => {
    if (orderBy === 'name' || orderBy === 'surname') {
      return a[orderBy].localeCompare(b[orderBy]);
    } else if (orderBy === 'connectedUsers' || orderBy === 'age') {
      return b[orderBy] - a[orderBy];
    } else {
      return 0;
    }
  };
}
