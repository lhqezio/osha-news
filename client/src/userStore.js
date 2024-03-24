import { configureStore } from '@reduxjs/toolkit';

const initialState = { value : false };

const actionTypes = {
  SET_LOGIN: 'LOGGED_IN',
  SET_LOGOUT: 'LOGGED_OUT'
};

const reducer = function userReducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.SET_LOGIN:
    return {...state, value : true };
  case actionTypes.SET_LOGOUT:
    return {...state, value : false };
  default:
    return state;
  }
};

const store = configureStore({
  reducer,
});

export { store, actionTypes };