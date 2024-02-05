import React from "react";
import images from "../../constants/images";
import "./quantity.css";
import { Link } from "react-router-dom";

const Quantity = () => {
  return (
    <>
      <div className="quantity">
        <h1>how many uses per month do you want?</h1>
        <p>Your current plan is : 6 uses per month</p>
      </div>
      <div className="list_quantity">
        <p>4 uses per month</p>
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
      </div>
      <div className="list_quantity">
        <p>8 uses per month</p>
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
      </div>
      <div className="list_quantity">
        <p>10 uses per month</p>
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
        <img src={images.stock_img2} className="stock_img1" alt="" />
      </div>
    </>
  );
};

export default Quantity;
