import React from "react";
import "./Brands.css";
import img1 from "./img-stock/logos/white/logo_1.png";
import img2 from "./img-stock/logos/white/logo_2.png";
import img3 from "./img-stock/logos/white/logo_3.png";
import img4 from "./img-stock/logos/white/logo_4.png";
import img5 from "./img-stock/logos/white/logo_5.png";

function Brands() {
  return (
    <div className="section-bg-image bg-top">
      <div className="container content">
        <div className="logos py-2 py-lg-5">
          <ul className="slides d-flex">
            <li>
              <a className="img-box" href="/#dummy-link">
                <img src={img1} alt="" />
              </a>
            </li>
            <li>
              <a className="img-box" href="/#dummy-link">
                <img src={img2} alt="" />
              </a>
            </li>
            <li>
              <a className="img-box" href="/#dummy-link">
                <img src={img3} alt="" />
              </a>
            </li>
            <li>
              <a className="img-box" href="/#dummy-link">
                <img src={img4} alt="" />
              </a>
            </li>
            <li>
              <a className="img-box" href="/#dummy-link">
                <img src={img5} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Brands;
