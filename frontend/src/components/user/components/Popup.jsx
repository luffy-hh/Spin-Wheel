import React, { useContext } from "react";
import Modal from "../modal/Modal";
import "./popup.scss";
import StateContext from "../../../context/StateContext";

const Popup = (props) => {
  const ctxData = useContext(StateContext);
  const { userReward, usedLucky } = ctxData;
  //console.log(userReward, usedLucky);
  return (
    <Modal onClose={props.onClose}>
      <div className="popup">
        <h1>Congratulations</h1>
        <div className="popup-detail">
          <div className="popup-detail-box">
            <span>Reward</span>
            <div className="popup-detail-box-item">{userReward.rewardName}</div>
          </div>
          <div className="popup-detail-box">
            <span>Lucky id.</span>
            <div className="popup-detail-box-item">{usedLucky.redeemCode}</div>
          </div>
        </div>
        {/*<div className="reward-img">
          <img src={userReward.rewardImage} alt="Reward" />
        </div>*/}
        <div className="mm-text">
          Screen Shot ရိုက်ပြီး ကစားထားသော Agent တွင်ထုတ်ယူပါ
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
