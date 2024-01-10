import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { PiCopy } from "react-icons/pi";
import StateContext from "../../../context/StateContext";
import { Button, message } from "antd";
import "./dashboard.scss";
import Loading from "../../loading/Loading";

const Dashboard = (props) => {
  const [quantity, setQuantity] = useState(0);

  const ctxData = useContext(StateContext);
  const {
    luckyData,
    banHandler,
    setEditNumber,
    rewardReturnData,
    agentReturnData,
    changeHandler,
    delAllLucky,
    loadingStatus,
  } = ctxData;
  // console.log(loadingStatus);
  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    // You may also want to show a toast or notification confirming that the text has been copied
  };
  // console.log(luckyData, agentReturnData);
  const luckyTable =
    luckyData.length > 0 ? (
      luckyData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <span>{item.redeemCode}</span>

              <PiCopy
                onClick={() => copyToClipboard(item.redeemCode)}
                className="copy"
              />
            </td>
            <td>
              {(item.redeemCodeStatus === "Available" ||
                item.redeemCodeStatus === "Preset") &&
                !item?.presetStatus && (
                  <button
                    onClick={() => {
                      changeHandler(item);
                    }}
                  >
                    Change
                  </button>
                )}
              <span
                className={`status ${
                  ((item.redeemCodeStatus === "Available" ||
                    item.redeemCodeStatus === "Requested") &&
                    "available") ||
                  (item.redeemCodeStatus === "Out" && "out") ||
                  (item.redeemCodeStatus === "Preset" && "set")
                } `}
              >
                {item.redeemCodeStatus}
              </span>
            </td>
            <td>
              {rewardReturnData.map(
                (data) => item.rewardId === data._id && data.rewardName
              )}
            </td>
            <td>
              {item?.presetStatus &&
                agentReturnData.map(
                  (ag) => ag._id === item?.presetStatus && ag.userName
                )}
            </td>
            {item.redeemCodeStatus !== "Out" ? (
              <td>
                <button
                  onClick={() => {
                    banHandler(item._id);
                  }}
                >
                  Ban
                </button>

                <Link to={`/admin/edit`}>
                  <button onClick={() => setEditNumber(item._id)}>Edit</button>
                </Link>
              </td>
            ) : (
              <td>-</td>
            )}
          </tr>
        );
      })
    ) : (
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    );

  const confirm = (e) => {
    delAllLucky();
    message.success("Cleared All Lucky");
  };

  const cancel = (e) => {
    message.error("You cancelled The operation");
  };

  return (
    <Fragment>
      <div className="cards">
        {/*<div className="card">
          <div className="card-generate__code">
            <h2>Generate Code</h2>

            <form onSubmit={generateHandler} className="form">
              <label htmlFor="quantity">
                <span>Quantity</span>
                <input
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                  id="quantity"
                  value={quantity === 0 ? "" : quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
              <button type="submit" className="btn">
                Generate
              </button>
            </form>
          </div>
          </div>*/}
        <div className="card">
          <div className="card-header">
            <p className="card-header__text">Code List</p>

          </div>
          {loadingStatus ? (
            <Loading />
          ) : (
            <table>
              <thead>
                <tr>
                  <td>No</td>
                  <td>Lucky Number</td>
                  <td>status</td>
                  <td>Reward Name</td>
                  <td>Agent Name</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>{luckyTable}</tbody>
            </table>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
