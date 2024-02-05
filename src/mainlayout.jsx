import "./App.css";
import "./mainlaiout.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Navbar from "./common/navbar/nav";
import { BiHome, BiMessage } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import {
  AiOutlineCustomerService,
  AiOutlineUser,
  AiTwotoneShopping,
} from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import images from "./constants/images";
import { useEffect, useState } from "react";
import Shopdetail from "./pages/Shopdetail/Shopdetail";
import Specialoffer from "./pages/special_offer/Specialoffer";
import { CgProfile } from "react-icons/cg";

import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/profile";
import Order from "./pages/order/order";
import Plan from "./pages/plan/plan";
import Plandetails from "./pages/plandetails/plan_details";
import Chat from "./pages/chat/Chat";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { BiSolidUserDetail } from "react-icons/bi";
import Manageplan from "./pages/manageplan/manageplan";
import Product from "./pages/product/product";
import Quantity from "./pages/quantity/quantity";
import Menus from "./pages/menus/menu";
import Checkoutlist from "./pages/checkoutlist/checkoutlist";
import Checkout from "./pages/checkout/checkout";

function Mainlayout() {
  const [isFirstPartVisible, setFirstPartVisible] = useState(false);

  const toggleFirstPart = () => {
    setFirstPartVisible(!isFirstPartVisible);
  };

  const handleChange = (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case "Profile":
        window.location.href = "/whitelabel/profile"; 
        break;
      case "Logout":
        localStorage.clear();
        window.location.href = "/whitelabel"; 
        break;
      // Add more cases if needed
      default:
        break;
    }
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("user_name");

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Function to update the greeting based on the current time
    const updateGreeting = () => {
      const currentTime = new Date();
      const hours = currentTime.getUTCHours() - 8; // Adjust for UTC-8 (PST)

      if (hours >= 0 && hours < 12) {
        setGreeting("Good morning");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    // Update the greeting when the component mounts
    updateGreeting();

    // Set up an interval to update the greeting every minute
    const interval = setInterval(updateGreeting, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`menus_div ${isFirstPartVisible ? "open" : ""}`}>
      <div className="mobile_menu_button2" onClick={toggleFirstPart}>
        <div className="menu_div_header">
          <p className="menu_nm">Menus</p>
          <span className="menu_icon_main">☰</span>
        </div>
      </div>

      <div className={`first_part1 ${isFirstPartVisible ? "open" : ""}`}>
        <div className="container">
          <div className="menu-bar">
            <nav className={`open ${isFirstPartVisible ? "open" : ""}`}>
              <div className="menu_main">
                <div className="Menu_div">
                  <Link to={"/home"} onClick={toggleFirstPart}>
                    <img src={images.new_logo} alt="" className="logo" />
                  </Link>
                  <Link to="/home">
                    <div className="menu_1">
                      <BiHome className="menu_im" />
                      <div className="menu_title">
                        <p>Dashboard </p>
                      </div>
                    </div>
                  </Link>
                  <Link to={"/chat"}>
                    <div className="menu_1">
                      <IoChatbubbleEllipsesSharp className="menu_im" />
                      <div className="menu_title">
                        <p> Messages </p>
                      </div>
                    </div>
                  </Link>
                  <Link to={"/profile"}>
                    <div className="menu_1">
                      <AiOutlineUser className="menu_im" />
                      <div className="menu_title">
                        <p>Account Details </p>
                      </div>
                    </div>
                  </Link>
                  <Link to={"/order"}>
                    <div className="menu_1">
                      <AiTwotoneShopping className="menu_im" />
                      <div className="menu_title">
                        <p>Orders</p>
                      </div>
                    </div>
                  </Link>
                  {/* <Link to={"/detail"}>
                  <div className="menu_1">
                    <MdOutlineProductionQuantityLimits className="menu_im" />
                    <div className="menu_title"> Product </div>
                  </div>
                </Link> */}
                  <Link to={"/specialoffer"}>
                    <div className="menu_1">
                      <BiHome className="menu_im" />
                      <div className="menu_title">
                        <p>Shop </p>
                      </div>
                    </div>
                  </Link>
                  <Link to={"/menus"}>
                    <div className="menu_1">
                      <BiHome className="menu_im" />
                      <div className="menu_title">
                        <p>Menus </p>
                      </div>
                    </div>
                  </Link>
                  {/* <Link to={"/Plan"}>
                  <div className="menu_1">
                    <IoIosListBox className="menu_im" />
                    <div className="menu_title"> <p>Plans </p> </div>
                  </div>
                </Link>
                <Link to={"/plandetails"}>
                  <div className="menu_1">
                    <BiSolidUserDetail className="menu_im" />
                    <div className="menu_title"> <p>Plan details </p></div>
                  </div>
                </Link>
                <Link to={"/product"}>
                  <div className="menu_1">
                    <BiSolidUserDetail className="menu_im" />
                    <div className="menu_title"> <p>product </p></div>
                  </div>
                </Link> */}
                  {/* <Link to={'/profile'}>
                  <div className="menu_1">
                    <CgProfile   className="menu_im" />
                    <div className="menu_title"> Profile </div>
                  </div>
                </Link> */}
                  <div className="menuu2">
                    <div className="menu_2">
                      {/* <BiHome className='menu_im' /> */}
                      <div className="menu_title1">
                        <p> GET SUPPORT</p>
                      </div>
                    </div>
                    <div className="support">
                      <AiOutlineQuestionCircle className="logo_titel2" />
                      {/* <div className="menu_title12"> */}
                        <p className="titel2_p"> FAQ </p>
                      {/* </div> */}
                    </div>
                    <div className="support">
                      <AiOutlineCustomerService className="logo_titel2" />
                      {/* <div className="menu_title12"> */}
                        <p className="titel2_p"> CONTACT US</p>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="dashborder_nav">
          <div className="dashborder_nav1">
            <h2 className="home_titel_bar">
              {greeting}, {username}
            </h2>
            <p className="home_titel_bar_sub">
              here is where you can find your order details
            </p>
          </div>
          <div className="dashborder_nav2">
            <img
              src={images.notification}
              className="notification"
              onClick={openModal}
              alt="Notification"
            />
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <span className="close" onClick={closeModal}>
                    X
                  </span>
                  <center>
                    <p className="modaltitel_h2"> Notification </p>
                  </center>
                  <div className="modal-content">
                    <div className="details_of_modal">
                      <h2> Expired Prescription </h2>
                      <p>
                        The prescription for your medication has expired and we
                        are unable to ship refills until you complete your
                        renewal request.You can easily change your medication or
                        modify your treatment plan!
                      </p>
                      <button className="modal_del_btn" onClick={closeModal}>
                        RENEW NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="dashborder_nav3">
            <select select onChange={handleChange} className="home_select">
              <option> {username} </option>
              <option> Profile </option>
              <option> Logout </option>
            </select>
          </div>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/plandetails" element={<Plandetails />} />
          <Route path="/manageplan" element={<Manageplan />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/product" element={<Product />} />
          <Route path="/quantity" element={<Quantity />} />
          <Route path="/order" element={<Order />} />
          <Route path="/detail" element={<Shopdetail />} />
          <Route path="/specialoffer" element={<Specialoffer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default Mainlayout;
