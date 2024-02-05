// Profile.js
import React, { useState } from "react";
import "./product.css";
import images from "../../constants/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const products = [
  {
    id: 1,
    image: images.product,
    title: "Title of Product 1",
    details: "Some details about Product 1",
    price: "From $19.55",
  },
  {
    id: 2,
    image: images.product2,
    title: "Title of Product 2",
    details: "Some details about Product 2",
    price: "From $19.55",
  },
  {
    id: 3,
    image: images.product3,
    title: "Title of Product 1",
    details: "Some details about Product 1",
    price: "From $19.55",
  },
  {
    id: 4,
    image: images.product4,
    title: "Title of Product 2",
    details: "Some details about Product 2",
    price: "From $19.55",
  },
  {
    id: 5,
    image: images.product5,
    title: "Title of Product 2",
    details: "Some details about Product 2",
    price: "From $19.55",
  },
];

const Product = () => {
  const sliderSettingsfisrt = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  return (
    <div className="product-container">
      <p className="shop_view">Shop/ View All</p>
      <br />
      <div className="product_main_details">
        <div className="product_main_details_sub1">
          <div className="new_titel">New</div >
          <br />
          <br />
          <br />
          <br />
          <Slider {...sliderSettingsfisrt}>
            <img src={images.product2} className="product_img_slider" alt="" />
            <img src={images.product2} className="product_img_slider" alt="" />
            <img src={images.product2} className="product_img_slider" alt="" />
          </Slider>
        </div>
        <div className="product_main_details_sub2">
          <h1>PROSTATE HEALTH SUPPORT</h1>
          <p>
            An advanced combination of ingredients selected to promote optimal
            prostate health and boost urinary function as men age.
          </p>
          <button className="shop_btn">Shop Now</button>
          <div className="product_bottom">
            <p className="shop_benefit"> Benefits </p>
            <p className="del-shop">
              PRECISE &nbsp;&nbsp;
              <span className="shop-span">POWERFUL COMPONENTS</span>
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="product-sub">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="card_sub">
              <img
                src={product.image}
                className="card_img_product"
                alt={product.title}
              />
            </div>
            <div className="card-details">
              <p className="title">{product.title}</p>
              <p className="details">{product.details}</p>
              <p className="price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
