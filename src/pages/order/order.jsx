import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";
import images from "../../constants/images";
import { get_order_list } from "../../utils/Constant";
import { order_details } from "../../utils/Constant";

const Order = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Getorderid, setorderid] = useState(0);
  const [Getsingelorderdata, settsingelorderdata] = useState({});
  const [is_token] = useState(localStorage.getItem("is_token"));
  const [orderlist, setOrderlist] = useState([]);
  const [gettotalRecourd, setTotalRecourd] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // ------------ OLD API COMMENT -------------

  // const Singelorderdata = async (id) => {
  //   try {
  //     const res = await axios.post(
  //       order_details,
  //       { id: id },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + is_token,
  //         },
  //       }
  //     );

  //     if (res.data.status === 1) {
  //       settsingelorderdata(res.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching order details", error);
  //   }
  // };
  ///  ----------------------------- Singelorderdata API ---------------
  const Singelorderdata = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://stage-api.whitelabelmd.com/v3mp/101/member/TEST-1234/order/${id}`,
        {
          // Include headers or authentication token if needed
          headers: {
            authtoken: "api-mp-bin=WECRGW%cCRTheR",
          },
        }
      );

      if (res.data.status === "success") {
        settsingelorderdata(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching order details", error);
    }
  };

  // ------------ ORDER API COMMENT -------------

  // const GetOrder = async () => {
  //   try {
  //     const res = await axios.get(
  //       // get_order_list,
  //       "https://stage-api.whitelabelmd.com/v3mp/101/member/TEST-1234/order-history"
  //       // {
  //       //   per_page: perPage,
  //       //   page: currentPage,
  //       // },
  //       // {
  //       //   headers: {
  //       //     Authorization: "Bearer " + is_token,
  //       //   },
  //       // }
  //     );

  //     if (res.data.status === 1) {
  //       setOrderlist(res.data);
  //       setTotalRecourd(res.data.total_recoad);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching orders", error);
  //   }
  // };
  //  --------------------- New GetOrder API -----------------------------
  const GetOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://stage-api.whitelabelmd.com/v3mp/101/member/TEST-1234/order-history",
        {
          headers: {
            authtoken: "api-mp-bin=WECRGW%cCRTheR",
          },
        }
      );
      setLoading(false);

      if (res.data.status === "success") {
        setOrderlist(res.data.data || []);
        setTotalRecourd(res.data.total_recoad);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(gettotalRecourd / perPage))
    );
  };

  useEffect(() => {
    GetOrder();
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(gettotalRecourd / perPage);
  const statusMapping = {
    1: "Processing",
    2: "Shipped",
    3: "Delivered",
    4: "Cancelled",
  };

  const startIdx = (currentPage - 1) * perPage;
  const endIdx = startIdx + perPage;
  const currentOrderList = orderlist.slice(startIdx, endIdx);
  const [loading, setLoading] = useState(false);
  return (
    <div className="screen_profile">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div
        className={`order_table_screen ${isModalVisible ? "modal_view" : ""}`}
      >
        <p className="order_history">Order History</p>
        <div className="order_detail_tabel">
          <div
            className="order_table_container"
            style={{ width: isModalVisible ? "75%" : "100%" }}
          >
            <table className="order_table">
              <thead>
                <tr>
                  <th>Order id</th>
                  {/* <th>Order Number</th> */}
                  <th>Status</th>
                  <th>Tracking #</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {orderlist && orderlist.length > 0
                  ? orderlist.map((i) => (
                      <tr key={i.order_id}>
                        <td>{i.order_id}</td>
                        {/* <td>{i.order_no}</td> */}
                        <td>{i.order_status}</td>
                        {/* <td>{statusMapping[i.order_status]}</td> */}
                        <td>{i.tracking_no !== "" ? i.tracking_no : "null"}</td>
                        {/* <td>{i.tracking_no}</td> */}
                        <td>{i.order_date}</td>
                        <td>
                          <a
                            className="details_btn"
                            onClick={() => {
                              toggleModal();
                              Singelorderdata(i.order_id);
                            }}
                          >
                            View Details
                          </a>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            {/* //This Code Are pagination */}
            <div className="pagination">
              {/* <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button> */}
            </div>
          </div>
          {isModalVisible && (
            <div className="modal_view">
              <div className="order_history2">
                <div className="modal_content_view">
                  <p className="order_history">Order Details</p>
                  <button className="close_view" onClick={toggleModal}>
                    X
                  </button>
                </div>
                <div className="order_modal_details">
                  <p>SHIPPING ADDRESS</p>
                  <p>{Getsingelorderdata.address_1}</p>
                  <p>
                    {Getsingelorderdata.city},{Getsingelorderdata.postcode},
                    {Getsingelorderdata.country}
                  </p>
                  {/* <p>{Getsingelorderdata.order_date}</p> */}
                  {/* <p>
                    {Getsingelorderdata.address_1}
                    {Getsingelorderdata.address_2}
                    {Getsingelorderdata.landmark}
                  </p> */}
                  <p>ORDER SUMMARY</p>
                  <table className="order_details_tabel">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td className="total_details">
                          ${Getsingelorderdata.shipping_amount}
                        </td>
                      </tr>
                      <tr>
                        <td>Shipping:</td>
                        <td className="total_details">
                          ${Getsingelorderdata.sub_total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <table className="order_details_tabel">
                    <tbody>
                      <tr>
                        <td>Total</td>
                        <td className="total_details">
                          ${Getsingelorderdata.total_amount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>PAYMENT METHOD</p>
                  <p>{Getsingelorderdata.payment_method}</p>

                  <p>Expires: 03/2026</p>
                  <p>DOWNLOAD RECEIPT</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
