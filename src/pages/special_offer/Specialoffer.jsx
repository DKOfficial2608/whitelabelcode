import React, { useEffect, useState } from "react";
import "./Specialoffer.css";
import images from "../../constants/images";
import axios from "axios";
import { get_product_list } from "../../utils/Constant";
import { Link } from "react-router-dom";

const Specialoffer = () => {
  const isTokan = localStorage.getItem("is_tokan");
  const user_id = localStorage.getItem("user_id");
  const [soffer, setsoffer] = useState([]);
  const GetProducts = async () => {
    try {
      const res = await axios.get("https://phan-dev.whitelabelmd.com/v1/site/10/products", {
        headers: {
          authtoken: "api-mp-bin=WECRGW%cCRTheR",
        },
      });

      if (res.data.status === 1) {
        setsoffer(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div className="special_offer_main">
      <div className="cont_of1">
        <h4>Special Offer from RedMD </h4>
        <div className="cards">
          {soffer && soffer.length > 0
            ? soffer.map((i) => {
                return (
                  <div className="cardd">
                    <div className="card_top">
                      <img
                        src={i.product_images[0].url}
                        className="card_img"
                        alt=""
                      />
                      <div className="card_r">
                        <div className="black">{i.product_name}</div>
                        <div className="green">{i.product_sku}</div>
                        <span
                          className="green"
                          dangerouslySetInnerHTML={{ __html: i.sub_text }}
                        />
                      </div>
                    </div>
                    <Link
                      to="/detail"
                      state={{ pId: i.product_id }}
                      className="card_btn"
                    >
                      Start Online Visit
                    </Link>
                    {/* <h6 className="moreinfo">More info/h6> */}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Specialoffer;
