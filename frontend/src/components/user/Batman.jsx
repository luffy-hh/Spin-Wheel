import React, {useContext} from "react";
import Carousel from "../../carousel/Carousel";
import "./batman.scss";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import SingleAppDownload from "../globalComponents/SingleAppDownload";
import StateContext from "../../context/StateContext";

const Batman = () => {
    const ctx = useContext(StateContext);
    const {downloadApk1}= ctx;
  return (
    <div className="outer-container">
      <div
        className="inner-container"
        style={{
          backgroundImage: `url(/imgs/Background.png)`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <Carousel />

        <div className="btn-gp">
          <Link to={`https://m.batman688.com/`} className="btn-link">
            <div
              className="batman-btn"
              style={{ backgroundImage: `url(./imgs/BatPlayGameButtom.png)` }}
            ></div>
          </Link>
          <Link to={`/spin-wheel`} className="btn-link">
            <div
              className="spin-btn"
              style={{ backgroundImage: `url(./imgs/BatSpinButtom.png)` }}
            ></div>
          </Link>
            <SingleAppDownload apk={downloadApk1} name={'Batman.apk'}/>
        </div>
      </div>
      <Footer img={"./imgs/BottomBar.png"} />
    </div>
  );
};

export default Batman;
