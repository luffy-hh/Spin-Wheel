import React, { useContext, useState } from "react";
import wheel from "../../../assets/img/SpinWheel.png";
import pointer from "../../../assets/img/SpinPointer.png";
import StateContext from "../../../context/StateContext";
import spinSound from "../../../assets/sound/spin(2).mp3";
import conSound from "../../../assets/sound/CongratulationSound2.mp3";
import "./spinWheel.scss";
import { useNavigate } from "react-router-dom";

function SpinWheel(props) {
  const ctxData = useContext(StateContext);
  // const [deg, setDeg] = useState(0);

  const {
    checkLuckyAvailability,
    banHandler,
    uiReward,
    usedLucky,
    // userReward,
    rotate,
    deg,
    setEnteredLucky,
    enteredLucky,
  } = ctxData;
  //console.log(deg);

  const clickHandler = (e) => {
    e.preventDefault();
    checkLuckyAvailability();
  };

  const labels = uiReward.map((item, i) => {
    return (
      <li className="label" key={i}>
        {item.rewardName}
        <span style={{ display: "none" }}>{item.id}</span>
      </li>
    );
  });
  if (uiReward.length < 8) {
    for (let i = 0; i < 8 - uiReward.length; i++) {
      labels.push(
        <li className="label" key={uiReward.length + i}>
          -<span style={{ display: "none" }}>{uiReward.length + i}</span>
        </li>
      );
    }
  }
  // for (let i = 0; i <= 8; i++) {
  //   return (
  //     <li className="label" key={i}>
  //       rewardReturnData[i] ? {rewardReturnData[i]} : "coming soon";
  //       <span style={{ display: "none" }}>{i}</span>
  //     </li>
  //   );
  // }

  const handleAnimateEnd = () => {
    new Audio(conSound).play();

    props.onShow();
  };
  const handleAnimateStart = (e) => {
    e.preventDefault();
    // console.log('click')
    rotate();
    new Audio(spinSound).play();
    banHandler(usedLucky._id);
    // sendData();
  };
  return (
    <div className="wheel-wrapper">
      <div className="wheel-container">
        <div className="wheel" onTransitionEnd={handleAnimateEnd}>
          <img
            src={`/imgs/spin wheel circle.png`}
            alt="Wheel"
            className="wheel-img"
          />
          <ul className="labels">{labels}</ul>
        </div>
        <img src={pointer} alt="Pointer" className="pointer" />

        {/*<SpinWheel />*/}
        {deg > 0 ? (
          <button className="spin-btn" onClick={handleAnimateStart}>
            Spin
          </button>
        ) : (
          <button className="spin-btn disable" disabled>
            Spin
          </button>
        )}
      </div>
      <div className="button-container">
        <h4>Insert Code</h4>
        <form className="form" onSubmit={clickHandler}>
          {/*<input
            type="text"
            onChange={(e) => {
              checkCode(e.target.value);
            }}
          />*/}
          <input
            type="text"
            onChange={(e) => {
              setEnteredLucky(e.target.value);
            }}
          />
          {enteredLucky.length >= 10 ? (
            <button className="wheel-btn">Ok</button>
          ) : (
            <button className="wheel-btn" disabled>
              No
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
export default SpinWheel;
