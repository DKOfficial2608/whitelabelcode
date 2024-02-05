// ForgotPassword.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetPassword = async () => {
    if (email.trim() === "") {
      setError("Please enter your email.");
    } else {
      setIsLoading(true);

      const param = {
        email: email,
      };

      await axios
        .post("https://kamaniinc.com/whitelabelmd/api/forgot-password", param)
        .then((Response) => {
          setIsLoading(false);
          console.log("Response", Response);
          if (Response.data.status == 1) {
            setSuccess(Response.data.msg);
          } else {
            setError(Response.data.msg);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
      // Assume success if email is provided
      // setSuccess('Password reset instructions sent to your email.');
      // setError(null);
      // setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="forgot_password_main">
      {isloading ? (
        <div className="loader" />
      ) : (
        <div className="forgot_password_bg">
          <div className="cont_forgot_password">
            <h1>Forgot Password</h1>
            <div className="form">
              {/* <h6 className="label">ENTER YOUR EMAIL</h6> */}
              <input
                type="email"
                className="input_forgot"
                placeholder="Your E-mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <span className="error">{error}</span>}
              <button className="submit_btn" onClick={handleResetPassword}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay2">
          <div className="modal forgot">
            <p>{success}</p>
            <div className="forgot_btn">
              <button className="forgot_button" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
