// Signup.js

import React, { useState } from "react";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import images from "../../constants/images";
import { user_login } from "../../utils/Constant";
import { useUserContext } from "../../context/user_context";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const { setUserLogin } = useUserContext();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate username
    if (!username) {
      newErrors.username = " Username / email addres is required";
      isValid = false;
    } else if (
      !(/^[a-zA-Z0-9_]{3,15}$/.test(username) || /\S+@\S+\.\S+/.test(username))
    ) {
      newErrors.username = "Incorrect Username / email address";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  //   -----------Signup API ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      const params = {
        site_id: 10,
        email_username: username,
        password: password,
        secret: "WLMD_MPS_joLH!ke@sAP?.", // Add the secret to the request
      };

      try {
        const response = await setUserLogin(params);
        console.log("API Response:", response);

        if (response && response.code === 1) {
          localStorage.setItem("is_login", JSON.stringify(true));
          localStorage.setItem("is_token", response.data.token);
          localStorage.setItem("user_role", response.data.role);
          localStorage.setItem("email_username", username);
          localStorage.setItem("user_name", response.data.name);
          localStorage.setItem("user_id", response.data.id);

          navigate("/home");
        } else if (
          response &&
          response.message === "Incorrect email or username"
        ) {
          const newErrors = {
            username: "Incorrect Username / email address",
            password: "",
          };
          setErrors(newErrors);
        } else if (response && response.message === "Password is invalid") {
          const newErrors = { email: "", password: "Password is invalid" };
          setErrors(newErrors);
        } else {
          console.error(
            "Login failed. Server message:",
            response && response.message
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during API call:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form is invalid. Please correct errors.");
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="signup_main">
      <div className="signup_bg">
        <div className="cont_sign_one">
          <center>
            <img src={images.new_logo} alt="" className="sign_logo" />
          </center>
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <div className="form">
            <h6 className="labelee">Username / email address</h6>
            <input
              type="text"
              className="inpute"
              placeholder="Your Username / email address"
              // placeholder="Your E-mail Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleEnterKeyPress}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
            <h6 className="labelee">PASSWORD</h6>
            <input
              type="password"
              className="inpute"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleEnterKeyPress}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <br />
            <br />
            <button className="sign_btn" onClick={handleSubmit}>
              SIGN IN
            </button>
          </div>
          <button className="google">
            <FcGoogle className="g_icon" />
            <span className="google_nm"> Sign in with Google</span>
          </button>
          <Link to="forgotpassword" className="forgot">
            Forgot Your Password?
          </Link>
          <p>
            Not a customer? <span className="forgot">Get Started</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
