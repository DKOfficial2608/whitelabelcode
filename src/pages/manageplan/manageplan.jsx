import React, { useState } from "react";
import images from "../../constants/images";
import "./manageplan.css";

const Manageplan = () => {

  return (
    <>
      <div className="Manageplan_order">

        {/* --------- OLD DESIGN COMMENT ---------- */}

        {/* <img src={images.truck} className="Manageplan_img" />
        <h2 className="Manag_h2">Need More medication?</h2>
        <button className="Manag_btn" onClick={openModal}>
          Place an order plan
        </button>
        <hr className="hr_Manag" />
        <img src={images.plane} className="Manageplan_img" />
        <h2 className="Manag_h2">Are you traveling / lifestyle changes?</h2>
        <button className="Manag_btn" onClick={openModal}>
          delay for 1 month
        </button>
        <p>One month delay will process jan 4, 2024</p>
        {isModalOpen && (
          <div className="travelmodal-overlay">
            <div className="travelmodal">
              <span className="travelclose" onClick={closeModal}>
                X
              </span>
              <center>
                <p className="travelmodaltitel_h2"> Confirm New Date </p>
              </center>
              <div className="travelmodal-content">
                <h2>Great, we'll delay 1 month</h2>
                <p className="">Your next order will process</p>
                <h2>jan 4 , 2024</h2>
                <button className="btn_modal" onClick={closeModal}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        <hr className="hr_Manag" />
        <h2 className="Manag_h2">Turn off auto-refills</h2>
        <p>
          Click below to move your account from auto-refill to on-demand orders.
          Or, stay on auto-refill plan and receive a $60 credit to your
          account*.
        </p>
        <button className="btn_modal2">Receive $60 credit</button>
        <button className="Manag_btn2">
          Continue to turn off auto-refills
        </button>
        <p>
          *This one-time credit will expire on Nov 5, 2022. You can use this
          credit towards any future purchase made through Ro.
        </p>
        <hr className="hr_Manag" /> */}
        <p className="del_of_shipment">
          Based on your current plan, your order can only be shipped every 3
          months.
        </p>
        <b>SHIP EVERY 3 MONTHS</b>
        <b className="price_month">$12/mo</b>
        <p>Billed $36 every 3 months. Cancel anytime.</p>
        <hr className="hr_Manag" />
        <button className="btn_modal3"> Got it</button>
      </div>
    </>
  );
};

export default Manageplan;
