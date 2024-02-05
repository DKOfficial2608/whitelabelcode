import React, { useState, useEffect } from "react";
import "./navbar.css";
import images from "../../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { BiHome, BiMessage } from "react-icons/bi";
import { AiOutlineCustomerService, AiOutlineQuestionCircle, AiOutlineUser, AiTwotoneShopping } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem('username')
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  // Add any logic here to conditionally show/hide the Navbar
  // const shouldShowNavbar = navigate().location.pathname !== '/';
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
   <>
    <div className={`container ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="menu-bar">
          {/* <img src={images.new_logo} alt="Logo" /> */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          <nav className={isMenuOpen ? 'open' : ''}>
            <div className="menu_main">
              <div className="Menu_div">
                <img src={images.new_logo} alt="" className="logo" />
                <Link to={'/home'}>
                  <div className="menu_1">
                    <BiHome className="menu_im" />
                    <div className="menu_title"> Dashboard </div>
                  </div>
                </Link>
                <div className="menu_1">
                  <BiMessage className="menu_im" />
                  <div className="menu_title"> Messages </div>
                </div>
                <Link to={'/profile'}>
                  <div className="menu_1">
                    <AiOutlineUser className="menu_im" />
                    <div className="menu_title"> Account Details </div>
                  </div>
                </Link>
                <Link to={'/order'}>
                  <div className="menu_1">
                    <AiTwotoneShopping className="menu_im" />
                    <div className="menu_title"> Orders </div>
                  </div>
                </Link>
                <Link to={'/detail'}>
                  <div className="menu_1">
                    <MdOutlineProductionQuantityLimits  className="menu_im" />
                    <div className="menu_title"> Orders </div>
                  </div>
                </Link>
                <Link to={'/specialoffer'}>
                  <div className="menu_1">
                    <BiHome className="menu_im" />
                    <div className="menu_title"> Shop </div>
                  </div>
                </Link>
                <Link to={'/signup'}>
                  <div className="menu_1">
                    <BiHome className="menu_im" />
                    <div className="menu_title"> login </div>
                  </div>
                </Link>
                {/* <Link to={'/profile'}>
                  <div className="menu_1">
                    <CgProfile   className="menu_im" />
                    <div className="menu_title"> Profile </div>
                  </div>
                </Link> */}
                <div className="menuu2">
                  <div className="menu_2">
                    {/* <BiHome className='menu_im' /> */}
                    <div className="menu_title1"> GET SUPPORT </div>
                  </div>
                  <div className="support">
                    <AiOutlineQuestionCircle />
                    <div className="menu_title12"> FAQ </div>
                  </div>
                  <div className="support">
                    <AiOutlineCustomerService />
                    <div className="menu_title12"> CONTACT US </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="dashboard">
          <div className="dashborder_nav">
            <div className="dashborder_nav1">
              <h2 className="home_titel_bar"> Good evening, {username} </h2>
              <p className="home_titel_bar_sub">
                here is where you can find your order details
              </p>
            </div>
            <div className="dashborder_nav2">
              <img
                src={images.notification} // Assuming images is defined somewhere
                className="notification"
                onClick={openModal}
                alt="Notification"
              />
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <span className="close" onClick={closeModal}>
                      & times;
                    </span>
                    <center>
                      <p className="modaltitel_h2"> Notification </p>
                    </center>
                    <div className="modal-content">
                      <div className="details_of_modal">
                        <h2> Expired Prescription </h2>
                        <p>
                          The prescription for your medication has expired and
                          we are unable to ship refills until you complete your
                          renewal request.You can easily change your medication
                          or modify your treatment plan!
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
              <select className="home_select">
                <option> JC champion </option> <option> select1 </option>
                <option> select2 </option> <option> select3 </option>
                <option> select4 </option>
              </select>
            </div>
          </div>
          </div>
      </div>
   </>
  );
};

export default Navbar;
