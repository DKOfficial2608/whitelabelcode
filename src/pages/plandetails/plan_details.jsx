import React, { useState } from "react";
import images from "../../constants/images";
import "./plan2.css";

const Plandetails = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="plandetails">
        <div className="plandetails1">
          <h2>Treatments</h2>
          <div className="detail_box">
            <div className="detail_box_1">
              <b>Sildenafil, 20mg</b>
              <p>Processing</p> 
              {/* <button>next order</button> */}
              <div className="select_box_list">
                <select>
                  <option onClick={openModal}>Next order</option>
                  <option>Update number of uses</option>
                  <option>Ask about a billing/shipping issue</option>
                </select>
                {isModalOpen && (
                  <div className="plandetails-overlay">
                    <div className="plandetails_1">
                      <span className="plandetails-close" onClick={closeModal}>
                        X
                      </span>
                      <center>
                        <p className="plandetails-title_h2">Order issue</p>
                      </center>
                      <div className="plandetails-content">
                        <textarea
                          placeholder="Tell Us More"
                          className="text-area"
                          rows="8"
                        ></textarea>
                        <button className="text-area_btn" onClick={closeModal}>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <select>
                  <option>Plan</option>
                  <option>View Plan Details</option>
                  <option>Request prescription chanage</option>
                  <option>Ask Provider about my prescription</option>
                </select>
              </div>
            </div>
            <div className="detail_box_2">
              <img src={images.stock_img} className="del_box_img" />
            </div>
          </div>
        </div>
        <div className="plandetails2">
          <h2>Upcoming</h2>
        </div>
      </div>
      <div>
        <h2>Other Offerings</h2>
        <p>FREE SHIPPING ON ALL PRODUCTS</p>
        <div className="box_second">
          <div className="box_second1">
            <div className="box_second_details">
              <div className="box_second_details1">
                <h2>Testosterone Support</h2>
              </div>
              <div className="box_second_details2">
                <img src={images.stock_img} className="del_box_img1" />
              </div>
            </div>
            <hr />
            <div className="btn_box">
              <button className="buy_btn">Buy Now </button>
              <a href="#" className="learn">
                Learn more
              </a>
            </div>
          </div>
          <div className="box_second2">
            <div className="box_second_details">
              <div className="box_second_details1">
                <h2>Swipes</h2>
              </div>
              <div className="box_second_details2">
                <img src={images.box_second} className="del_box_img1" />
              </div>
            </div>
            <hr />
            <div className="btn_box">
              <button className="buy_btn">Buy Now </button>
              <a href="#" className="learn">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plandetails;
