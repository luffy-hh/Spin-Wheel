import React, {useContext} from "react";
import Carousel from "../../carousel/Carousel";
import "./live22.scss";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import SingleAppDownload from "../globalComponents/SingleAppDownload";
import StateContext from "../../context/StateContext";

const Live22 = () => {
    const ctx = useContext(StateContext);
    const { downloadApk2}= ctx;
  return (
    <div className="outer-container">
      <div
        className="inner-container"
        style={{
          backgroundImage: `url(/imgs/Live22Background.png)`,
          backgroundSize: "100% 100%",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <Carousel />
        <div className="btn-gp">
          <Link
            to={`https://22.caveman88.com/web/lobbyv2/login.html?m7=N9ic`}
            className="btn-link"
          >
            <div
              className="batman-btn"
              style={{
                backgroundImage: `url(./imgs/Live22PlayGameButtom.png)`,
              }}
            ></div>
          </Link>
          <Link to={`/spin-wheel`} className="btn-link">
            <div
              className="spin-btn"
              style={{
                backgroundImage: `url(./imgs/Live22SpinWheelButtom.png)`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
            ></div>
          </Link>
            <SingleAppDownload apk={downloadApk2} name={'live22.apk'}/>
        </div>
      </div>
      <Footer img={"./imgs/Live22BottomBar.png"} design={"Designed By HPH"} />
    </div>
  );
};

export default Live22;
