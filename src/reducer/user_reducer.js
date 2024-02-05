import {

  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,

} from "../Action";

const user_register = (state, action) => {

  // login

  if (action.type === USER_LOGIN_BEGIN) {
    return { ...state, user_login_loading: true };
  }

  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      ...state,
      user_login_loading: false,
      user_login_data: action.payload,
    };
  }

  if (action.type === USER_LOGIN_FAIL) {
    return { ...state, user_login_loading: false };
  }
};

export default user_register;
