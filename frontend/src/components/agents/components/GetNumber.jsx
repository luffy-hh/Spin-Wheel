import React, { Fragment, useContext, useEffect, useState } from "react";
import { PiCopy } from "react-icons/pi";
import "./getNumber.scss";
import StateContext from "../../../context/StateContext";

const GetNumber = () => {
  const ctxData = useContext(StateContext);
  const { requestNumberHandler, reqNum } = ctxData;
  const [animate, setAnimate] = useState(false);
  // console.log(reqNum);
  const luckyNumber = reqNum ? reqNum.redeemCode : null;
  // console.log(luckyNumber);
  useEffect(() => {
    if (luckyNumber) {
      setAnimate(true);

      const timer = setTimeout(() => {
        setAnimate(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [luckyNumber]);

  const submitHandler = (e) => {
    e.preventDefault();
    requestNumberHandler();
  };
  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    // You may also want to show a toast or notification confirming that the text has been copied
  };
  return (
    <Fragment>
      <div className="cards">
        <div className="card">
          <div className="card-request">
            <h2>Request Lucky Number</h2>
            {/*<p>
              You have requested <strong>100</strong> Lucky Numbers total
  </p>*/}

            <form onSubmit={submitHandler} className="form">
              <button type="submit" className="btn">
                Request
              </button>
            </form>
            <div className="lucky-field">
              <span>Lucky Number</span>
              <div className={`lucky ${animate ? "animate" : ""} `}>
                {luckyNumber ? luckyNumber : "AB12345678"}
                <PiCopy
                  onClick={() => copyToClipboard(luckyNumber)}
                  className="copy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GetNumber;
