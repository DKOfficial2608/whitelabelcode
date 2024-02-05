// Menus.js
import React, { useState } from "react";
import "./checkout.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";

function Checkout() {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardType, setCardType] = useState("");

  const detectCardType = (cardNumber) => {
    if (/^4/.test(cardNumber)) {
      return "Visa";
    } else if (/^5[1-5]/.test(cardNumber)) {
      return "MasterCard";
    } else if (/^3[47]/.test(cardNumber)) {
      return "American Express";
    } else {
      return "Unknown";
    }
  };

  const validateCreditCard = () => {
    const type = detectCardType(creditCardNumber);
    setCardType(type);
  };
  // Perform other validations as needed

  const [isSameAsShipping, setIsSameAsShipping] = useState(true);
  const [showBillingDetails, setShowBillingDetails] = useState(false);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSameAsShippingChange = () => {
    setIsSameAsShipping(true);
    setShowBillingDetails(false);
  };

  const handleDifferentBillingChange = () => {
    setIsSameAsShipping(false);
    setShowBillingDetails(true);
  };

  //   const handleCityChange = (e) => {
  //     setCity(e.target.value);
  //   };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };
  return (
    <div className="checkout_main">
      <div className="checkout_main_del">
        <div className="checkout_left">
          <div className="checkout_card">
            <h2>Checkout Details</h2>
            <div className="input_group_1">
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Phone" />
            </div>
          </div>
          <div className="checkout_card">
            <h2>Shipping Address</h2>
            <div className="input_group_1">
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
            </div>
            <div className="input_group">
              <input type="text" placeholder="Address" />
            </div>
            <div className="input_group_3">
              <select name="" id="billingState">
                <option value="" selected disabled>
                  Select State
                </option>
                <option value="">Alabama</option>
                <option value="">Alaska</option>
              </select>
              <input type="text" id="billingCity" placeholder="City" />
              <input
                type="text"
                id="billingPostalCode"
                name="billingPostalCode"
                placeholder="Postal code"
              ></input>
            </div>
          </div>
          <div class="co-group co-payment">
            <h3>Payment</h3>
            <input
              type="text"
              id="creditCardNumber"
              name="creditCardNumber"
              placeholder="Credit card number"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              required
            />

            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              placeholder="Cardholder's name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              required
            />
            <div class="two-col">
              <div>
                <input
                  type="number"
                  id="expireDate"
                  name="expireDate"
                  placeholder="MM/YYYY"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  id="cvc"
                  name="cvc"
                  placeholder="CVC/CVV"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="billing_address">
            <h2>Billing Address</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <input
                  type="radio"
                  name="billingOption"
                  checked={isSameAsShipping}
                  onChange={handleSameAsShippingChange}
                />
                Same as Shipping Address
              </label>
              <label>
                <input
                  type="radio"
                  name="billingOption"
                  checked={!isSameAsShipping}
                  onChange={handleDifferentBillingChange}
                />
                Different Billing Address
              </label>
            </div>

            {showBillingDetails && (
              <div>
                <div>
                  <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    placeholder="Billing Address"
                  />
                </div>
                <div className="three-col">
                  <select name="" id="billingState">
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="">Alabama</option>
                    <option value="">Alaska</option>
                  </select>
                  <input type="text" id="billingCity" placeholder="City" />
                  <input
                    type="text"
                    id="billingPostalCode"
                    name="billingPostalCode"
                    placeholder="Postal code"
                  ></input>
                </div>
                {/* Add additional billing details as needed */}
              </div>
            )}
          </div>

          <label for="consentCheckbox" class="consent">
            <input
              type="checkbox"
              id="consentCheckbox"
              name="consentCheckbox"
              required=""
            />
            <span id="recurring_term">
              By clicking "Complete Order" you will be charged $99.95 for your
              first shipment and $99.95 every 30 days subscription for ACID
              thereafter until you cancel or your prescription expires. You can
              cancel your plan anytime by logging into your account or via email
              at{" "}
              <a
                className="recurring_term_a"
                href="mailto:support@mdmedica.com"
                target="_blank"
              >
                support@mdmedica.com
              </a>
            </span>
          </label>
          <br />
          <button type="submit" className="com_btn">
            Complete order
          </button>
        </div>
        <div className="checkout_right">
          <div className="review_order_card">
            <h2>Review Order</h2>
            <div className="flex-container">
              <div className="image-container">
                <img src={images.product_15} alt="Product Image" />
              </div>
              <div className="text-container">
                <b>PHAN TEST</b>
                <br />
                <small>SAMPLE OFFER</small>
              </div>
              <div className="price_product">
                <p>$90.00</p>
              </div>
            </div>
            <hr />
            <div className="discount-code-container">
              <input
                type="text"
                placeholder="Discount Code"
                className="discount-input"
              />
              <button className="apply-btn">Apply</button>
            </div>
            <hr />
            <table className="order-summary-table">
              <tbody>
                <tr>
                  <td>Items total (1 Item)</td>
                  <td className="tabel_left_del">$90.00</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td className="tabel_left_del">$9.95 Shipping</td>
                </tr>
                <tr>
                  <td>Coupon Discount</td>
                  <td className="tabel_left_del">$0.00</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div className="total-container">
              <p>Total</p>
              <p>$99.95</p>
            </div>
          </div>
          <p className="text_">
            Would you like to add any of these supplements to your order?
          </p>
          <div>
            <div class="upsell-container">
              <div class="upsell-item">
                <input
                  type="checkbox"
                  id="upsellProduct1"
                  name="upsellProducts[]"
                  value="upsellProduct1"
                />
                <label for="upsellProduct1">
                  {/* <img src={images.correct} alt="Upsell Product 1" /> */}
                  <span>Upsell Product Name 1</span>
                </label>
              </div>

              <div class="upsell-item">
                <input
                  type="checkbox"
                  id="upsellProduct2"
                  name="upsellProducts[]"
                  value="upsellProduct2"
                />
                <label for="upsellProduct2">
                  {/* <img src={images.correct} alt="Upsell Product 2" /> */}
                  <span>Upsell Product Name 2</span>
                </label>
              </div>

              <div class="upsell-item">
                <input
                  type="checkbox"
                  id="upsellProduct3"
                  name="upsellProducts[]"
                  value="upsellProduct3"
                />
                <label for="upsellProduct3">
                  {/* <img src={images.correct} alt="Upsell Product 3" /> */}
                  <span>Upsell Product Name 3</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
