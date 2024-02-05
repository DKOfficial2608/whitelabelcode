import React, { useEffect, useState } from "react";
import "./Shopdetail.css";
import images from "../../constants/images";
import {
  AiFillStar,
  AiOutlineCar,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { Button, ButtonGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BsCircle } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  add_new_address,
  add_to_cart,
  checkout,
  get_user_address,
  my_cart_items,
  product_details,
  update_cart_details,
} from "../../utils/Constant";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Shopdetail = () => {
  const [count, setCount] = useState(1);
  const [getorderType, setOrderType] = useState(1);
  const [getoptionType, setOptionType] = useState(1);
  const location = useLocation();
  const handleMinusClick = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const handlePlusClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const [subscribe, setsubscribe] = useState(true);
  const [f, setquantity] = useState(1);
  const [review, setreview] = useState([
    {
      id: 1,
      review1: "wow",
      review2:
        "I have dry and frizzy hair. I must use conditioner for every shampoo. After i started using the Plum shampoo, for the First 2 weeks, there is heavy hairfall... after that, there is no hairfall at all. I have to use minimal hair serum. Even if I want to switch to any other shampoo, I don't feel like it. Coz am frightened that I might get back the hairfall. Scent is also minimal.",
      date: "01/03/2022",
    },
    {
      id: 1,
      review1: "controls frizz",
      review2:
        "Gentle to hair and controls frizz. I have low porosity, wavy, frizzy hair and it's suits me well.",
      date: "81/06/2022",
    },
    {
      id: 1,
      review1: "1.0 out of 5 stars I will never recommend this shampoo",
      review2:
        "From last 1 week I am using this shampoo and my hair has become dry, rough and experienced tremendous hair fall. Even my son faced hairfall.",
      date: "01/09/2022",
    },
    { id: 1, review1: "wow", review2: "i liked it", date: "21/05/2022" },
  ]);

  const isTokan = localStorage.getItem("is_tokan");
  const user_id = localStorage.getItem("user_id");
  const [product_images, setproduct_images] = useState([]);
  const [single_img, setSingleImg] = useState("");
  const [Getdata, setData] = useState({});
  const [getloading, setLoading] = useState(false);
  const [GetcartData, setCartData] = useState([]);
  const [getAddressList, setAddressList] = useState([]);
  const [getselecteAddress, setSelecteAddress] = useState(0);
  const [GettotalItems, setTotalItems] = useState("");
  const [GettotalItemsSubTotal, setTotalItemsSubTotal] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isuccessModalOpen, setIsSuccessModalOpen2] = useState(false);
  const [getsubPrice, setSubPrice] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressType, setAddressType] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isAddressOpen, setIsAddAddress] = useState(false);
  
  const resetForm = () => {
    setAddressType(0);
    setAddress1("");
    setAddress2("");
    setLandmark("");
  };
  const openAddressModal = () => {
    setIsAddAddress(true);
  };

  const handleCloseModaladdress = () => {
    setIsAddAddress(false);
    resetForm();
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen2(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleAddressChange = (event) => {};

  const AddToCart = async () => {
    setLoading(true);
    const param = {
      product_id: location.state.pId,
      qty: count,
      option_type: getoptionType,
      order_type: getorderType,
    };
    await axios
      .post(add_to_cart, param, {
        headers: {
          Authorization: "Bearer " + isTokan,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.status == 1) {
          CartItems();
          openModal();
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const AddAddress = async () => {
    setLoading(true);
    const param = {
      address_type: addressType,
      address_1: address1,
      address_2: address2,
      landmark: landmark,
    };
    await axios
      .post(add_new_address, param, {
        headers: {
          Authorization: "Bearer " + isTokan,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.status == 1) {
          GetAddresses();
          setIsAddAddress(false);
          resetForm();
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const Checkout = async () => {
    if (getselecteAddress == 0) {
      alert("Please select an address");
    } else {
      setLoading(true);
      const param = {
        payment_card_id: 1,
        addres_id: getselecteAddress,
      };
      await axios
        .post(checkout, param, {
          headers: {
            Authorization: "Bearer " + isTokan,
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (res.data.status == 1) {
            GetSigleProduct();
            setIsModalOpen(false);
            setIsModalOpen2(false);
            setIsSuccessModalOpen2(true);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const UpdateCart = async (id, qty) => {
    setLoading(true);

    const param = {
      id: id,
      qty: qty,
    };
    await axios
      .post(update_cart_details, param, {
        headers: {
          Authorization: "Bearer " + isTokan,
        },
      })
      .then((res) => {
        setLoading(false);

        console.log(res);
        if (res.data.status == 1) {
          CartItems();
          // openModal()
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const GetSigleProduct = async () => {
    setLoading(true);

    const param = {
      id: location.state.pId,
    };
    await axios
      .post(product_details, param, {
        headers: {
          Authorization: "Bearer " + isTokan,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.status == 1) {
          setData(res.data.data);
          setproduct_images(res.data.data.product_images);
          setSingleImg(res.data.data.product_images[0].url);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const CartItems = async () => {
    setLoading(true);
    await axios
      .get(my_cart_items, {
        headers: {
          Authorization: "Bearer " + isTokan,
        },
      })
      .then((res) => {
        setLoading(false);

        console.log(res);
        if (res.data.status == 1) {
          setCartData(res.data.data);
          setTotalItemsSubTotal(res.data.total_item_subtotal);
          setTotalItems(res.data.total_items);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const GetAddresses = async () => {
    await axios
      .get(get_user_address, {
        headers: {
          Authorization: "Bearer " + isTokan,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          setAddressList(res.data.data);
        }
      });
  };

  useEffect(() => {
    GetSigleProduct();
    GetAddresses();
  }, []);

  useEffect(() => {
    console.log( parseInt(Getdata.sub_price * count) );
  }, [count]);
  

  
  return (
    <div className="detal_m">
      <div className="base_container">
        {/* Left side menu */}

        {/* Main content */}
        <div className="part_2">
          {/* ----- */}
          {getloading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="loader" />
            </div>
          ) : (
            <div className="shopdetail_body">
              <span>shop / </span> <span>Hair care / </span>
              <span>Shampoo </span>
              <div className="detail_about">
                <div className="detail_about_pic">
                  <div style={{ textAlign: "center" }}>
                    <img src={single_img} alt="" className="main_pic" />
                  </div>
                  <div className="oth_pic">
                    {/* <img src={images.shampoo} alt="" className="oth_pic_s" />
                  <img src={images.shampoo4} alt="" className="oth_pic_s" />
                  <img src={images.shampoo1} alt="" className="oth_pic_s" />
                  <img src={images.shampoo} alt="" className="oth_pic_s" />
                  <img src={images.shampoo3} alt="" className="oth_pic_s" />*/}

                    {product_images && product_images.length > 0
                      ? product_images.map((img, ind) => {
                          return (
                            <>
                              <img
                                src={img.url}
                                alt=""
                                className="oth_pic_s"
                                key={ind}
                                onClick={() => {
                                  setSingleImg(img.url);
                                }}
                                style={{
                                  border:
                                    single_img === img.url
                                      ? "1px solid red"
                                      : "1px solid transparent",
                                }}
                              />
                            </>
                          );
                        })
                      : null}
                  </div>
                </div>

                <div className="detail_about_prize">
                  {/* <div className="titleD_1">Last Longer</div> */}
                  <div className="titleD_2">{Getdata.name}</div>
                  <div className="prize">
                    <div className="prize_left">
                      <div className="pay">
                        <div className="prize_pay">${Getdata.sub_price}</div>
                        <div className="prize_org">${Getdata.mrp}</div>
                      </div>
                      <div className="more">
                        <div className="option">
                          <div className="title_o">Option:</div>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => {
                              setOptionType(e.target.value);
                            }}
                          >
                            <option selected value="1">
                              1-Month supply
                            </option>
                            <option value="2">2-Month supply</option>
                            <option value="3">3-Month supply</option>
                          </Form.Select>
                        </div>
                        <div className="quantity">
                          <div className="title_o">Quantity:</div>
                          <div className="number">
                            <span className="minus" onClick={handleMinusClick}>
                              -
                            </span>
                            <input
                              type="text"
                              value={count}
                              className="count_del"
                              readOnly
                            />
                            <span className="plus" onClick={handlePlusClick}>
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prize_right">
                      <AiFillStar className="star_color" />
                      <AiFillStar className="star_color" />
                      <AiFillStar className="star_color" />
                      <AiFillStar className="star_color" />
                      <AiFillStar className="star_color" />
                    </div>
                  </div>
                  <div className="container_1">
                    <button
                      className={`container_1l ${
                        getorderType === 2 ? "container_1l_h" : ""
                      }`}
                      onClick={() => {
                        setsubscribe(true);
                        setOrderType(2);
                        console.log(getorderType);
                      }}
                    >
                      {getorderType === 2 ? (
                        <AiOutlineCheckCircle className="check" />
                      ) : (
                        <BsCircle className="check" />
                      )}
                      Subscribe & save
                    </button>
                    <button
                      className={`container_1r ${
                        getorderType === 1 ? "container_1r_h" : ""
                      }`}
                      onClick={() => {
                        setsubscribe(false);
                        setOrderType(1);
                        console.log(getorderType);
                      }}
                    >
                      {getorderType == 1 ? (
                        <AiOutlineCheckCircle className="check" />
                      ) : (
                        <BsCircle className="check" />
                      )}
                      One-Time Purchase
                    </button>
                    {getorderType === 2 && (
                      <div className="container_1l_del">
                        <div className="sub_contnr">
                          <h6 className="sub_contnr_h6">{Getdata.sub_text}</h6>
                          <p className="sub_contnr_p">
                            Select delivery frequency
                          </p>
                          <Form.Select
                            aria-label="Default select example"
                            className="form_s"
                          >
                            <option>Ship every month</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <div className="cancel">
                            <img
                              src={images.close}
                              className="can_icon"
                              alt=""
                            />
                            {/* <AiOutlineCloseCircle className="can_icon" /> */}
                            <div className="can_txt">Cancel anytime</div>
                          </div>
                          <div className="cancel">
                            <img
                              src={images.pencil}
                              className="can_icon"
                              alt=""
                            />
                            {/* <BiSolidEditAlt className="can_icon" /> */}
                            <div className="can_txt">
                              Edit subscription frequency anytime
                            </div>
                          </div>
                        </div>
                        <div className="borderline">
                          <div className="line"></div>
                        </div>
                      </div>
                    )}
                    {getorderType === 1 && (
                      <div className="container_1r_del"></div>
                    )}
                    <div className="sub_contnr_2">
                      <div className="total">
                        <h5 style={{ textAlign: "start", width: "50%" }}>
                          Total
                        </h5>
                        <h5
                          style={{
                            textAlign: "end",
                            width: "50%",
                            color: "#3a913a",
                          }}
                        >
                          {/* <s style={{ color: "grey" }}>${Getdata.mrp}</s> ${Getdata.sub_price} */}
                        ({count} items): $
                       { parseInt(Getdata.sub_price * count)}
                        </h5>
                      </div>
                      <button
                        className="add2"
                        onClick={() => {
                          // openModal
                          AddToCart();
                        }}
                      >
                        ADD TO CART
                      </button>
                      {isModalOpen && (
                        <div className="order_modal-overlay">
                          <div className="order_modal_1">
                            <span
                              className="order_modal-close"
                              onClick={closeModal}
                            >
                              X
                            </span>
                            <center>
                              <p className="order_modal-title_h2">
                                Added to cart
                              </p>
                            </center>
                            <div className="order_modal-content">
                              <button
                                className="select_add_address"
                                onClick={openModal2}
                              >
                                Select Address
                              </button>
                              {isModalOpen2 && (
                                <div className="order_modal-right">
                                  <div className="select_add_address_modal">
                                    <span
                                      className="order_modal-close"
                                      onClick={closeModal2}
                                    >
                                      X
                                    </span>
                                    <div>
                                      <h2>Select Your Address</h2>
                                      <div className="details_of_address">
                                        {getAddressList &&
                                        getAddressList.length > 0
                                          ? getAddressList.map(
                                              (item, index) => {
                                                console.log("item", item);
                                                return (
                                                  <label
                                                    className="select_add"
                                                    id={item.id}
                                                  >
                                                    <input
                                                      type="radio"
                                                      name="address"
                                                      value={item.id}
                                                      checked={
                                                        getselecteAddress ===
                                                        item.id
                                                      }
                                                      onChange={() => {
                                                        setSelecteAddress(
                                                          item.id
                                                        );
                                                        console.log(
                                                          "getselecteAddress",
                                                          getselecteAddress
                                                        );
                                                      }}
                                                    />
                                                    <p className="select_new_add">
                                                      {item.address_1},
                                                      {item.address_2},
                                                      {item.landmark}
                                                    </p>
                                                  </label>
                                                );
                                              }
                                            )
                                          : null}
                                      </div>
                                    </div>
                                    <div className="add_btn_new">
                                      <button
                                        onClick={() => {
                                          closeModal2();
                                        }}
                                        className="select_add_address"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => {
                                          openAddressModal();
                                        }}
                                        className="select_add_address"
                                      >
                                        Add New Address
                                      </button>
                                      {isAddressOpen && (
                                        <div className="add_new_address">
                                          <div className="add_address_modal">
                                            <div className="modal_header_address">
                                              <h1>Add New Address</h1>
                                              <span
                                                onClick={
                                                  handleCloseModaladdress
                                                }
                                                className="close_addrees"
                                              >
                                                X
                                              </span>
                                            </div>
                                            <select
                                              value={addressType}
                                              onChange={(e) =>
                                                setAddressType(e.target.value)
                                              }
                                              className="select_new_add_cart"
                                            >
                                              <option value="0">
                                                Select Type
                                              </option>
                                              <option value="1">Home</option>
                                              <option value="2">Work</option>
                                              <option value="3">Hotel</option>
                                              <option value="4">Other</option>
                                            </select>
                                            <input
                                              type="text"
                                              value={address1}
                                              onChange={(e) =>
                                                setAddress1(e.target.value)
                                              }
                                              className="add_text_new"
                                              placeholder="Enter Your Address Line 1"
                                            />
                                            <input
                                              type="text"
                                              value={address2}
                                              onChange={(e) =>
                                                setAddress2(e.target.value)
                                              }
                                              className="add_text_new"
                                              placeholder="Enter Your Address Line 2"
                                            />
                                            <input
                                              type="text"
                                              value={landmark}
                                              onChange={(e) =>
                                                setLandmark(e.target.value)
                                              }
                                              className="add_text_new"
                                              placeholder="Landmark"
                                            />
                                            <button
                                              className="sub_new_add"
                                              onClick={AddAddress}
                                            >
                                              Submit
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <p>
                                cart subtotal ({GettotalItems} items): $
                                {GettotalItemsSubTotal}
                              </p>
                              <button
                                className="pro_to_check"
                                onClick={() => {
                                  // checkOut
                                  Checkout();
                                }}
                              >
                                PROCEED TO CHECKOUT
                              </button>
                              <p>Your cart</p>
                              {GetcartData && GetcartData.length > 0 ? (
                                GetcartData.map((item, index) => {
                                  console.log(
                                    "product_image",
                                    item.product_image.url
                                  );
                                  return (
                                    <div className="order_details">
                                      <div className="order_details1">
                                        <img
                                          src={item.product_image.url}
                                          className="product_sub_img"
                                          alt=""
                                        />
                                      </div>
                                      <div className="order_details2">
                                        <p>{item.product_name}</p>
                                        <p>
                                          ${item.product_price}{" "}
                                          <span>${item.product_mrp}</span>
                                        </p>
                                      </div>
                                      <div className="order_details3">
                                        <div className="number">
                                          <span
                                            className="minus"
                                            onClick={() => {
                                              const newQty =
                                                parseInt(item.qty, 10) - 1;

                                              UpdateCart(item.id, newQty);
                                            }}
                                          >
                                            -
                                          </span>
                                          <input
                                            type="text"
                                            value={item.qty}
                                            className="count_del"
                                            readOnly
                                          />
                                          <span
                                            className="plus"
                                            onClick={() => {
                                              const newQty =
                                                parseInt(item.qty, 10) + 1;

                                              UpdateCart(item.id, newQty);
                                            }}
                                          >
                                            +
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p>No Cart item found</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="car">
                        <AiOutlineCar className="car_icon" />
                        <h6 className="car_txt">
                          First, Discreet Shipping. <br /> Free shipping on all
                          orders.
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container_2">
                <div className="btns">
                  <button className="btn1">DESCRIPTION</button>
                  <button className="btn1">HOW IT WORKS</button>
                  <button className="btn1">REVIEWS</button>
                </div>
                {review.map((i) => {
                  return (
                    <div className="review">
                      <div className="star">
                        <AiFillStar
                          style={{ color: "#c76363" }}
                          className="star1"
                        />
                        <AiFillStar
                          style={{ color: "#c76363" }}
                          className="star1"
                        />
                        <AiFillStar
                          style={{ color: "#c76363" }}
                          className="star1"
                        />
                        <AiFillStar
                          style={{ color: "#c76363" }}
                          className="star1"
                        />
                        <AiFillStar
                          style={{ color: "#c76363" }}
                          className="star1"
                        />
                      </div>
                      <div className="rev_1">{i.review1}</div>
                      <div className="rev_1">{i.review2}</div>
                      <div className="rev_2">{i.date}</div>
                    </div>
                  );
                })}
                <div className="related_products">
                  <div className="related_title">Related Products</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isuccessModalOpen && (
          <>
            <div className="order_place">
              <div className="modal-content">
                <p>Your order has been placed successfully!</p>
                <button onClick={handleCloseModal}>Okay</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shopdetail;
