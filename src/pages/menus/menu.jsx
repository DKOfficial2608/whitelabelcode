// Menus.js
import React, { useEffect, useState } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import axios from "axios";

function Menus() {
  // menus mobile
  const [isFirstPartVisible, setIsFirstPartVisible] = useState(false);

  const toggleFirstPart = () => {
    setIsFirstPartVisible(!isFirstPartVisible);
  };
  //   menus mobile

  const [campaigns, setCampaigns] = useState([]);

  const [offersApi, setOffersApi] = useState("");
  const [getloading, setLoading] = useState(false);
  const [getcampaignId, setCampaignId] = useState("");

  const [getoffers, setOffers] = useState([]);
  const [getbilling, setBilling] = useState([]);
  const [getshipping, setShipping] = useState([]);
  const [getproduct, setProduct] = useState([]);
  const [getproductlist, setProductlist] = useState([]);

  const authToken = "api-postman-eric=demo911";

  const campaignsApi = "https://phan-dev.whitelabelmd.com/v2/site/11/campaigns";

  const GetAllCampaigns = async () => {
    setLoading(false);
    await axios
      .get(campaignsApi, {
        headers: {
          authtoken: authToken,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.status == "success") {
          console.log("res", res.data.data);
          setCampaigns(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const GetAllOffers = async (url) => {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          authtoken: authToken,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.status == "success") {
          console.log("res", res.data.data);
          setOffers(res.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const GetAllBilling = async (url) => {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          authtoken: authToken,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        // if (res.data.status == "success") {
        console.log("res", res.data);
        setBilling(res.data);
        // }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const GetAllShipping = async (url) => {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          authtoken: authToken,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        // if (res.data.status == "success") {
        console.log("res shiping", res.data.data);
        setShipping(res.data.data);
        // }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const GetAllProduct = async (url) => {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          authtoken: authToken,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        // if (res.data.status == "success") {
        console.log("res", res.data);
        setProduct(res.data);
        // }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const GetAllProductlist = async (url) => {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          authtoken: authToken,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        // if (res.data.status == "success") {
        console.log("res", res.data.moredata);
        setProductlist(res.data.moredata);
        // }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetAllCampaigns();
  }, []);

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
          </Link>
        </p>
        <Link to="/checkoutlist" className="link_check">
          Checkout Link
        </Link>
      </div>
      <div className="second_part">
        <div className="second_part_details">
          {getloading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
          <h1>Create Checkout Link</h1>
          <hr />
          <div className="dropdown">
            <label htmlFor="campaignDropdown">Campaign:</label>
            <select
              id="campaignDropdown"
              onChange={(e) => {
                setCampaignId(e.target.value);
                
                GetAllOffers(
                  `https://phan-dev.whitelabelmd.com/v1/site/11/campaigns/${e.target.value}/offers`
                );

                console.log(offersApi);
              }}
            >
              <option>Select Campaign</option>
              {campaigns && campaigns.length > 0
                ? campaigns.map((item, index) => {
                    return (
                      <option value={item.campaign_id} key={item.id}>
                        {item.campaign_name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>

          <div className="dropdown">
            <label htmlFor="offerDropdown">Offer:</label>
            <select
              onChange={(e) => {
                GetAllBilling(
                  `https://phan-dev.whitelabelmd.com/v2/site/11/offers/${e.target.value}/billing-models`
                );
                console.log(e.target.value);
              }}
              id="offerDropdown"
            >
              <option value="" selected>
                Select Offer
              </option>
              {getoffers && getoffers.length > 0
                ? getoffers.map((item, index) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>

          <div className="dropdown">
            <label htmlFor="billingModelDropdown">Billing Model:</label>
            <select
              id="billingModelDropdown"
              onChange={(e) => {
                GetAllShipping(
                  `https://phan-dev.whitelabelmd.com/v2/site/11/checkout/${e.target.value}/shipping-models`
                );
                console.log(e.target.value);
              }}
            >
              <option value="" selected>
                Select Billing Modal
              </option>
              {getbilling && getbilling.length > 0
                ? getbilling.map((item, index) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="shippingModelDropdown">Shipping Model:</label>
            <select
              id="shippingModelDropdown"
              onChange={(e) => {
                GetAllProduct(
                  `https://phan-dev.whitelabelmd.com/v2/site/11/checkout/${e.target.value}/offers/7/products`
                );
                console.log("111", e.target.value);
              }}
            >
              <option>Select Shipping Model</option>
              {getshipping && getshipping.length > 0
                ? getshipping.map((item, index) => {
                    return (
                      <option value={item.campaign_id} key={item.id}>
                        {item.moredata.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="productDropdown">Product:</label>
            <select
              id="productDropdown"
              onChange={(e) => {
                GetAllProductlist(
                  `https://phan-dev.whitelabelmd.com/v2/site/11/checkout/${e.target.value}/offers/${e.target.value}/products`
                );
                console.log(e.target.value);
              }}
            >
              <option>Select Product</option>
              {getproductlist && getproductlist.length > 0
                ? getproductlist.map((item, index) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="customPrice">
            <label htmlFor="customPriceInput">Custom Price:</label>
            <input type="text" id="customPriceInput" />
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="preserve_custom_price_check"
              name="preserve_custom_price_check"
            />
            <label class="form-check-label" for="preserve_custom_price_check">
              Preserve Custom Price in recurring amount
            </label>
          </div>
          <div className="dropdown">
            <label htmlFor="templateDropdown">Template:</label>
            <select id="templateDropdown">
              <option value="1">Template 1</option>
              <option value="2">Template 2</option>
              <option value="3">Template 3</option>
            </select>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="allow_promo_check"
              name="allow_promo_check"
            />
            <label class="form-check-label" for="allow_promo_check">
              Allow Coupon/Promo Code
            </label>
          </div>
          <button type="submit" name="save" value="link" class="btn_add_chech">
            Add Checkout Link
          </button>
        </div>
      </div>
    </div>
  );
}
export default Menus;
