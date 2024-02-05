import React from "react";
import images from "../../constants/images";
import "./plan.css";
import { Link } from "react-router-dom";

const Plan = () => {
  return (
    <>
      <div className="plan_main">
        <div className="plan_main1">
          <img src={images.plan_img} className="plan_main_img" />
        </div>
        <div className="plan_main2">
          <h3 className="plan_product_nm">Sildenafil</h3>
          <p> for Erectile Dysfu</p>
          <div className="product_details_main">
            <p>STRENGTH</p>
            <h3 className="plan_product_nm">20mg</h3>
            <hr />
            <p>INSTRUCTIONS</p>
            <p className="del_product_list">
              Take 1 tablet by mouth 1 hour before sexual activity. Do not
              exceed 1 tablet per 24 hours.
            </p>
            <hr />
            <p>ABOUT YOUR TREATMENT</p>
            <p>How to use</p>
            <p>Serious side effects</p>
            <p>Common side effects</p>
            <p>Other tips</p>
          </div>
          <div className="sub_list_pro">
            <h3>3 refills left</h3>
            <img src={images.pills_bottle} className="pills_bottle" />
            <img src={images.pills_bottle} className="pills_bottle" />
            <img src={images.pills_bottle} className="pills_bottle" />
          </div>
          <hr className="hr_list" />
          <div className="sub_part_list">
            <div className="sub_part_list1">
              <img src={images.meds} className="pills_bottle" />
            </div>
            <div className="sub_part_list2">
              <h3>18 doses per 3 months</h3>
              <Link to={'/quantity'} className="quantity_tag">Update quantity</Link>
            </div>
          </div>
          <hr className="hr_list" />
          <div className="sub_part_list">
            <div className="sub_part_list1">
              <img src={images.calendar} className="pills_bottle" />
            </div>
            <div className="sub_part_list2">
              <h3>Auto-refilled every 3 months</h3>
              <p className="Processing_nm">Processing.</p>
              <p>Switch to monthly</p>
            </div>
          </div>
          <hr className="hr_list" />
        </div>
      </div>
      <div className="description_order">
        <img src={images.clock} className="description_img" />
        <p className="desc_p">EXPIRATION DATE</p>
        <h2  className="desc_h2">September 19, 2023</h2>
        <p>
          All prescriptions expire. To provide quality treatment, you are
          required to check in with your provider when your prescription nears
          its expiration date or you run out of refills in order to continue
          treatment.
        </p>
        <hr className="hr_desc" />
        <img src={images.pills_bottle} className="description_img" />
        <p className="desc_p">NEED MORE FLEXIBILITY?</p>
        <h2 className="desc_h2" >Have too much medication?</h2>
        <p>
          We get it, life circumstances change. Going on-demand allows you to
          have access to your doctor 24/7 while pausing your treatment. You can
          come back anytime.
        </p>
        <Link to={"/manageplan"} className="desc_btn">Manage plan</Link>
      </div>
    </>
  );
};

export default Plan;
