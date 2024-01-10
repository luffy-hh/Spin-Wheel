import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = (props) => {
  // console.log(props.img);
  return (
    <div className="footer ">
      <div
        className="footer-container"
        style={{ backgroundImage: `url(${props.img})` }}
      >
        <p>
          POWERED BY TYS & HHS....
          <br />
          {props.design && <span>{props.design.toUpperCase()}</span>}
        </p>

        <div className="icon-box">
          <Link to={"https://www.facebook.com/slots.iris?mibextid=ZbWKwL"}>
            <div className="iconF"></div>
          </Link>
          <Link to="viber://chat?=+959969000045">
            <div className="iconV"></div>
          </Link>
          <Link to={"https://t.me/aphoegyi_slot"}>
            <div className="iconT"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
