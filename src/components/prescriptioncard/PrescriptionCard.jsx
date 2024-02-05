import React, { useState } from "react";
import images from "../../constants/images";
import "./prescriptioncard.css";

const PrescriptionCard = ({}) => {
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
  
    const handleChange = (event) => {
      const selectedOption = event.target.value;
  
      switch (selectedOption) {
        case "Update shipment Frequency":
          window.location.href = "/whitelabel/Manageplan"; // Replace with the actual URL of your Manageplan page
          break;
        case "Update number of uses":
          window.location.href = "/whitelabel/Quantity"; // Replace with the actual URL of your Quantity page
          break;
        case "Ask about a billing/shipping issue":
          openModal();
          break;
        // Add more cases if needed
        default:
          break;
      }
    };
  
  return (
    <>
      <div className="home_box">
        <div className="home_box1">
          <img src={images.stock_img} className="stock_img_2" />
        </div>
        <div className="home_box2">
          <p>20mg sildenafil</p>
          <p>1 month supply</p>
          <div className="details_order_home">
            <img src={images.danger} className="box_icon_img" />
            <img src={images.correct} className="box_icon_img" />
            <p>Order Hold</p>
          </div>
          <div className="home_box_select">
            <select onChange={handleChange}>
              <option>Next Order</option>
              <option>Update shipment Frequency</option>
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
              <option>Plan </option>
              <option>1 month </option>
              <option>2 month </option>
              <option>3 month </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionCard;
