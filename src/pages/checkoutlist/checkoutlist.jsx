// Menus.js
import React, { useState } from "react";
import "./checkoutlist.css";
import { Link } from "react-router-dom";

function Checkoutlist() {

  const [isFirstPartVisible, setIsFirstPartVisible] = useState(false);

  const toggleFirstPart = () => {
    setIsFirstPartVisible(!isFirstPartVisible);
  };
  
  // Sample data array
  const checkoutData = [
    {
      id: 22,
      codestring: "Preview",
      template_id: 1,
      campaign_id: 5,
      offer_id: 7,
      product_id: 1983,
      billing_model_id: 3,
      shipping_id: 3,
      published: 0,
    },
    {
      id: 23,
      codestring: "Preview",
      template_id: 1,
      campaign_id: 5,
      offer_id: 7,
      product_id: 1983,
      billing_model_id: 3,
      shipping_id: 3,
      published: 0,
    },
    {
      id: 24,
      codestring: "Preview",
      template_id: 1,
      campaign_id: 5,
      offer_id: 7,
      product_id: 1983,
      billing_model_id: 3,
      shipping_id: 3,
      published: 0,
    },
    {
      id: 25,
      codestring: "Preview",
      template_id: 1,
      campaign_id: 5,
      offer_id: 7,
      product_id: 1983,
      billing_model_id: 3,
      shipping_id: 3,
      published: 0,
    },
    {
      id: 26,
      codestring: "Preview",
      template_id: 1,
      campaign_id: 5,
      offer_id: 7,
      product_id: 1983,
      billing_model_id: 3,
      shipping_id: 3,
      published: 0,
    },
    // Add more data as needed
  ];

  return (
    <div className={`menus_div ${isFirstPartVisible ? "open" : ""}`}>
      <div className="mobile_menu_button" onClick={toggleFirstPart}>
        <div className="menu_div_header">
        <p className="menu_nm">Menus</p>
          <span className="menu_icon_main">☰</span>
        </div>
      </div>
      <div className={`first_part2 ${isFirstPartVisible ? "open" : ""}`}>
        <h1>Menu</h1>
        <hr />
        <p>
          <Link to="/menus" className="link_check">
            New Checkout Lin
          </Link>{" "}
        </p>
        <Link to="/checkoutlist" className="link_check">
          Checkout Link
        </Link>
      </div>
      <div className="second_part">
        <div className="check_list_tabel">
          <table className="check_tabel">
            <thead>
              <tr>
                <th colSpan="9" className="mcl">
                  Manage Checkout Link
                </th>
              </tr>
              <tr>
                <th>id</th>
                <th>codestring</th>
                <th>template_id</th>
                <th>campaign_id</th>
                <th>offer_id</th>
                <th>product_id</th>
                <th>billing_model_id</th>
                <th>shipping_id</th>
                <th>published</th>
              </tr>
            </thead>
            <tbody className="tabel_list">
              {checkoutData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <Link to="/checkout " target="_blank" className="a_check">
                      {item.codestring}
                    </Link>
                  </td>
                  <td>{item.template_id}</td>
                  <td>{item.campaign_id}</td>
                  <td>{item.offer_id}</td>
                  <td>{item.product_id}</td>
                  <td>{item.billing_model_id}</td>
                  <td>{item.shipping_id}</td>
                  <td>{item.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Checkoutlist;
