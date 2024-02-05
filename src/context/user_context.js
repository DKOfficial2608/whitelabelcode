import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import user_reducer from "../reducer/user_reducer";
import {                                                   
  USER_LOGIN_BEGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

} from "../Action";
import {
  user_login,
} from "../utils/Constant";
import { useLocation, useNavigate } from "react-router-dom";

const getisLogin = () => {
  let is_login = localStorage.getItem("is_login");
  console.log("is_login", is_login);
  if (is_login) {
    return JSON.parse(localStorage.getItem("is_login"));
  } else {
    return {};
  }
};

const initialState = {
  is_login: getisLogin(),
  user_register_loading: false,
  user_login_loading: false,
  user_otp_loading: false,
  is_loading: false,
  user_login_data: [],
  user_otp_data: "",
  user_otp: "",
  forgate_data: "",
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);
 
  // Login

  const setUserLogin = async (params, url) => {
    dispatch({ type: USER_LOGIN_BEGIN });
    try {
      const response = await axios.post('https://stageapi.whitelabelmd.com/api/v1/member/login', params);
      const registerdata = response.data;
      console.log("====", response.data);
      if (registerdata.status == 1) {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: registerdata });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL });
      localStorage.setItem("is_login", JSON.stringify(false));
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
