import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import images from "../../constants/images";
import axios from "axios";
import {
  BASEURL2,
  get_user_profile_details2,
  update_profile2,
} from "../../utils/Constant";
import moment from "moment";

const Profile = () => {
  // 15-12-2023
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [getimg, setImage] = useState();

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  // 15-12-2023

  const [fullname, setFullname] = useState("");

  const [email, setEmail] = useState("");
  const [getprofilrImg, setProfileImg] = useState("");
  const [mobile, setMobile] = useState("");
  const [getdob, setDob] = useState("");
  const [getfactor_auth, setFactorAuth] = useState(false);
  const [getprofileData, setProfileData] = useState();
  const [getaddress, setAddress] = useState("");
  const [getprofileImageBlob, setProfileImageBlob] = useState(""); // Added state for user_id
  const [getprofilebase64, setProfilebase64] = useState(""); // Added state for user_id
  const [loading, setLoading] = useState(false);

  const isTokan = localStorage.getItem("is_token");
  const user_id = localStorage.getItem("user_id");

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;
//  --------------------- FileChange Images -------------------------------
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      blobToBase64(file)
        .then((base64String) => {
          setProfilebase64(base64String);
        })
        .catch((error) => {
          console.error("Error converting Blob to Base64:", error);
        });

      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log("getfactor_auth:", getfactor_auth);
    // console.log("111", user_id);
  }, []);
  const handleValidation = () => {
    let isValid = true;

    // Validate Full Name
    if (!fullname.trim()) {
      setFullnameError("Full Name is required");
      isValid = false;
    } else {
      setFullnameError("");
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate Date of Birth
    if (!getdob) {
      setDobError("Date of Birth is required");
      isValid = false;
    } else {
      setDobError("");
    }

    // Validate Phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobile)) {
      setMobileError("Enter a valid 10-digit phone number");
      isValid = false;
    } else {
      setMobileError("");
    }

    return isValid;
  };
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob);
    });
  };
  //  -------------------base64 Image Code ----------------------------
  function base64ToBlob(base64String, contentType = "image/jpeg") {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
  //  ------------------------GetProfile API ---------------------------------
  const GetProfile = async (user_id, token) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://stageapi.whitelabelmd.com/api/v1/get/member?site_id=10&id=${user_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setLoading(false);

      const user = response.data.data.user;
      setFullname(user.name);
      setEmail(user.email);
      setProfilebase64(user.profile_image);
      setDob(user.dob);
      setMobile(user.mobile_no);
      setFactorAuth(user.factor_authentication);

      if (user.profile_image) {
        const blob = base64ToBlob(user.profile_image);
        const blobUrl = URL.createObjectURL(blob);
        setImageSrc(blobUrl);
      } else {
        // Set a default image when user.profile_image is null
        setImageSrc(images.profiled);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  // ----------------UpdateProfile  API -----------------------------
  const UpdateProfile = async (token) => {
    if (!handleValidation()) {
      return;
    }
    setLoading(true);
    console.log("123", "Bearer " + token);

    const formdata = new FormData();
    formdata.append("site_id", 10);
    formdata.append("id", user_id);
    formdata.append("name", fullname);
    formdata.append("email", email);
    formdata.append("mobile_no", mobile);
    formdata.append("dob", getdob);
    if (confirmPassword !== "") {
      formdata.append("password", confirmPassword);
    }

    formdata.append("factor_authentication", getfactor_auth ? 1 : 0);
    formdata.append("profile_image", getprofilebase64);
    const formDataObject = {};
    formdata.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log("FormData as Object:", formDataObject);

    const formDataJson = Array.from(formdata.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    );

    await axios
      .put(
        "https://stageapi.whitelabelmd.com/api/v1/member/update-user",
        formDataJson,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
        setSuccessMessage("Your profile has been successfully updated.");

        // Show the fixed message container
        document
          .querySelector(".fixed-message-container")
          .classList.add("show");

        setTimeout(() => {
          setSuccessMessage(null);
          // Hide the fixed message container
          document
            .querySelector(".fixed-message-container")
            .classList.remove("show");
        }, 3000);
        console.log(res.data);
        GetProfile(user_id, token);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetProfile(user_id, isTokan);
  }, []);

  return (
    <div className="screen_profile">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="fixed-message-container">
        <p className="fixed-message-text">{successMessage}</p>
      </div>

      <div>
        <div className="upload_pic">
          <div className="show_pic_upload">
            {imageSrc && (
              <img className="show_pic_upload" src={imageSrc} alt="Uploaded" />
            )}
          </div>
          <div className="upload_file">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              required
              accept="image/*"
            />
            <button className="upload_btn" onClick={handleUploadButtonClick}>
              Upload File
            </button>
          </div>
        </div>
        <p className="profile_name">Profile</p>
        <div className="form_part_2">
          <div className="form_row">
            <div className="form_group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                style={{ width: "100%" }}
                className="input_tag"
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
              {fullnameError && (
                <span style={{ color: "red" }}>{fullnameError}</span>
              )}
            </div>

            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                style={{ width: "100%" }}
                className="input_tag"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <span style={{ color: "red" }}>{emailError}</span>}
            </div>
          </div>
          <div className="form_row">
            <div className="form_group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                style={{ width: "100%" }}
                className="input_tag"
                value={getdob}
                required
                onChange={(e) => {
                  setDob(moment(e.target.value).format("YYYY-MM-DD"));
                }}
              />
              {dobError && <span style={{ color: "red" }}>{dobError}</span>}
            </div>

            <div className="form_group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                required
                name="phone"
                style={{ width: "100%" }}
                className="input_tag"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {mobileError && (
                <span style={{ color: "red" }}>{mobileError}</span>
              )}
            </div>
          </div>
          <p className="update_password_title">Update Password</p>
          <div className="form_group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              style={{ width: "100%" }}
              className="input_tag"
              // value={password}
            />
          </div>
          <br />
          <div className="form_row">
            <div className="form_group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                style={{ width: "100%" }}
                className="input_tag"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form_group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                style={{ width: "100%" }}
                className="input_tag"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPassword && passwordsMatch && (
                <p style={{ color: "green", marginTop: "5px" }}>
                  Passwords match!{" "}
                  <span role="img" aria-label="checkmark">
                    &#10004;
                  </span>
                </p>
              )}
              {confirmPassword && !passwordsMatch && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Passwords do not match.
                </p>
              )}
            </div>
          </div>
          <p className="two_factor_title">2-Factor Authentication</p>
          <div className="form_group">
            <label className="radio_btn_class">
              <input
                type="radio"
                name="authMethod"
                value="turnOff"
                checked={getfactor_auth == 0}
                onChange={() => setFactorAuth(0)}
              />
              Turn Off
            </label>
            <label className="radio_btn_class2">
              <input
                type="radio"
                name="authMethod"
                value="emailText"
                checked={getfactor_auth == 1}
                onChange={() => setFactorAuth(1)}
              />
              Email/Text
            </label>
          </div>

          <p className="billing_shipping_title">Billing & Shipping</p>
          <div className="edit_payment_method">
            <img src={images.visa} className="visa_img" alt="Credit Card" />
            <p className="card_number">************1234</p>
            <p className="exp_date">Exp: 05/26</p>
            <button className="edit_payment_btn">Edit Payment Method</button>
          </div>
          <p className="shipping_info_title">SHIPPING INFORMATION</p>
          <div className="form_group">
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value=""
              // 26141 Hathmor Dr, Calabasas, CA 91302
            />
          </div>
          <button onClick={() => UpdateProfile(isTokan)} className="save_btn">
            Save
          </button>
          {/* <input type="submit" /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
