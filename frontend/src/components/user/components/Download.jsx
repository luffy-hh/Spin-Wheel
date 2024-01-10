import React, { useContext, useState } from "react";
// import ad1 from "../assets/img/1.png";
// import ad2 from "../assets/img/2.png";
// import ad3 from "../assets/img/3.png";
// import ad4 from "../assets/img/4.png";
import "./download.scss";
import StateContext from "../../../context/StateContext";
import DownloadPopup from "../modal/DownloadPopup";

const Download = () => {
  const ctx = useContext(StateContext);
  const {
    boxAds1,
    boxAds2,
    boxAds3,
    boxAds4,
    boxAds5,
    boxAds6,
    downloadApk1,
    downloadApk2,
    downloadApk3,
    downloadApk4,
    downloadApk5,
    downloadApk6,
  } = ctx;
  const [isModalOpenApk1, setIsModalOpenApk1] = useState(false);
  const [isModalOpenApk2, setIsModalOpenApk2] = useState(false);
  const [isModalOpenApk3, setIsModalOpenApk3] = useState(false);
  const [isModalOpenApk4, setIsModalOpenApk4] = useState(false);
  const [isModalOpenApk5, setIsModalOpenApk5] = useState(false);
  const [isModalOpenApk6, setIsModalOpenApk6] = useState(false);

  const apk1DownHandler = () => {
    const link = document.createElement("a");
    link.href = downloadApk1;
    link.download = "batman.apk";
    link.click();
  };
  const apk2DownHandler = () => {
    const link = document.createElement("a");
    link.href = downloadApk2;
    link.download = "live22.apk";
    link.click();
  };
  const apk3DownHandler = () => {
    const link = document.createElement("a");
    link.href = downloadApk3;
    link.download = "dailyA.apk";
    link.click();
  };
  const apk4DownHandler = () => {
    const link = document.createElement("a");
    link.href = downloadApk4;
    link.download = "shanWorld.apk";
    link.click();
  };
  const apk5DownHandler = () => {
    const link = document.createElement("a");
    link.href = downloadApk5;
    link.download = "iDragon.apk";
    link.click();
  };
  const apk6DownHandler = () => {
    const link = document.createElement("a");
    link.href = downloadApk6;
    link.download = "555Mix.apk";
    link.click();
  };
  return (
      <div className="outerContainer">
          <div className="box">
              <DownloadPopup
                  show={isModalOpenApk1}
                  setShow={setIsModalOpenApk1}
                  down={apk1DownHandler}
                  name={"Batman.apk"}
              />
              <div
                  className="box-icon icon1"
                  onClick={() => {
                      setIsModalOpenApk1(true);
                  }}
              >
                  {/*<img src={batman} alt="Batman Download" />*/}
              </div>
              <div
                  className="box-ad ad1"
                  style={{ backgroundImage: `url(${boxAds1})` }}
              >
                  {/*<img src={ad1} alt="Test" />*/}
              </div>
              <DownloadPopup
                  show={isModalOpenApk2}
                  setShow={setIsModalOpenApk2}
                  down={apk2DownHandler}
                  name={"Live22.apk"}
              />
              <div className="box-icon icon2" onClick={() => setIsModalOpenApk2(true)}>
                  {/* <img src={live22} alt="Live22 Download" />*/}
              </div>
              <div
                  className="box-ad ad2"
                  style={{ backgroundImage: `url(${boxAds2})` }}
              >
                  {/*<img src={ad2} alt="Test" />*/}
              </div>
              <DownloadPopup
                  show={isModalOpenApk3}
                  setShow={setIsModalOpenApk3}
                  down={apk3DownHandler}
                  name={"DailyA.apk"}
              />
              <div
                  className="box-icon icon3"
                  onClick={() => {
                      setIsModalOpenApk3(true);
                  }}
              >
                  {/*<img src={daily} alt="Dailya Download" />*/}
              </div>
              <div
                  className="box-ad ad3"
                  style={{ backgroundImage: `url(${boxAds3})` }}
              >
                  {/*<img src={ad3} alt="Test" />*/}
              </div>
              <DownloadPopup
                  show={isModalOpenApk4}
                  setShow={setIsModalOpenApk4}
                  down={apk4DownHandler}
                  name={"ShanWorld.apk"}
              />
              <div
                  className="box-icon icon4"
                  onClick={() => {
                      setIsModalOpenApk4(true);
                  }}
              >
                  {/*<img src={shan} alt="Dailya Download" />*/}
              </div>
              <div
                  className="box-ad ad4"
                  style={{ backgroundImage: `url(${boxAds4})` }}
              >
                  {/*<img src={ad4} alt="Test" />*/}
              </div>
              <DownloadPopup
                  show={isModalOpenApk5}
                  setShow={setIsModalOpenApk5}
                  down={apk5DownHandler}
                  name={"iDragon.apk"}
              />
              <div
                  className="box-icon icon5"
                  onClick={() => {
                      setIsModalOpenApk5(true);
                  }}
              >
                  {/*<img src={dragon} alt="Dailya Download" />*/}
              </div>
              <div
                  className="box-ad ad5"
                  style={{ backgroundImage: `url(${boxAds5})` }}
              >
                  {/*<img src={ad4} alt="Test" />*/}
              </div>
              <DownloadPopup
                  show={isModalOpenApk6}
                  setShow={setIsModalOpenApk6}
                  down={apk6DownHandler}
                  name={"555mix.apk"}
              />
              <div
                  className="box-icon icon6"
                  onClick={() => {
                      setIsModalOpenApk6(true);
                  }}
              >
                  {/*<img src={dragon} alt="Dailya Download" />*/}
              </div>
              <div
                  className="box-ad ad6"
                  style={{ backgroundImage: `url(${boxAds6})` }}
              >
                  {/*<img src={ad4} alt="Test" />*/}
              </div>
          </div>
      </div>

  );
};

export default Download;
