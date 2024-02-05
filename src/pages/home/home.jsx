import React, { useState, useRef, useEffect } from "react";
import images from "../../constants/images";
import "./home.css";
import PrescriptionCard from "../../components/prescriptioncard/PrescriptionCard";

const Home = () => {
  const [steps, setSteps] = useState([
    {
      id: 1,
      text: "Label Created",
      date: "1st November, 2019",
      checked: false,
    },
    {
      id: 2,
      text: "Shipped - 123 Start St. Seattle, WA",
      date: "1st November, 2019",
      checked: false,
    },
    {
      id: 3,
      text: "Estimated - 456 End St. New York City, NY",
      date: "3rd November, 2019",
      checked: false,
    },
  ]);

  const handleRightClick = (id) => (e) => {
    e.preventDefault();
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, checked: !step.checked } : step
      )
    );
  };

  return (
    <>
      <div className="home_second">
        <div className="home_second1">
          <img src={images.lock} className="lock_img" />
        </div>
        <div className="home_second2">
          <h2 className="home_second_text">Exclusive member-only benefits</h2>
          <p className="home_second2_details">
            As a member, you can get access to RexMD products at exclusive
            member-only pricing.
          </p>
          <button className="home_second2_btn">
            <img src={images.key} className="home_second2_key" alt="" /> UNLOCK
            DISCOUNTS
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="home_section2">
        <div className="home_section2_sub">
          <img src={images.alert_cion} className="alert_cion" />
          <p className="alert_titel">Prescription Renewal Required</p>
          <p className="details_alert">
            Your prescription has expired for the medication(s) below and we are
            currently unable to ship you future prescription refills until you
            complete your renewal.
          </p>
        </div>
        <div className="home_second_detais">
          <div className="home_second_detais1">
            <div className="home_sub_part1">
              <img src={images.stock_img} className="stock_img" />
            </div>
            <div className="home_sub_part2">
              <p>ERECTILE DYSFUNCTION</p>
              <p className="mg_text">20mg Sildenafil</p>
            </div>
          </div>
          <div className="home_second_detais2">
            <button className="renew_now">RENEW NOW</button>
          </div>
        </div>
      </div>
      <div className="orders_home">
        <div className="orders_home1">
          <p className="order-0">Your Treatment Orders</p>
          <p>Prescription</p>
          <br />
          <PrescriptionCard/>
        </div>
        <div className="orders_home2">
          <p className="order-1">Most Recent Order Status </p>
          <div className="root">
            <div className="order_del_status">
              <div className="status_details">
                <img src={images.sync} className="sync_icon" alt="" />
                <div className="order_del_status_2">
                  <p>20mg sildenafil</p>
                  <p>last update: December 11, 2023 10:47:50 PM</p>
                </div>
                <img src={images.right_icon} className="sync_icon" alt="" />
              </div>
            </div>
            <br />
            <div className="order-track">
              {steps.map((step) => (
                <div key={step.id} className="order-track-step">
                  <div
                    className="order-track-status"
                    onContextMenu={handleRightClick(step.id)}
                  >
                    {step.checked ? (
                      <span className="order-track-checkbox">&#10003;</span>
                    ) : (
                      <>
                        <span className="order-track-status-dot"></span>
                        <span className="order-track-status-line"></span>
                      </>
                    )}
                  </div>
                  <div className="order-track-text">
                    <p className="order-track-text-stat">{step.text}</p>
                    <span className="order-track-text-sub">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
