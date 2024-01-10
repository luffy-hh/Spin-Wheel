import React, {Fragment, useContext, useState} from "react";
import Marquee from "react-fast-marquee";
import useEmblaCarousel from "embla-carousel-react";
import WheelNavbar from "./components/WheelNavbar";
import SpinWheel from "./components/SpinWheel";
import Top10Win from "./components/Top10Win";
import Autoplay from "embla-carousel-autoplay";
import Footer from "./components/Footer";
import "./wheel.scss";
import StateContext from "../../context/StateContext";
import BtnGroup from "./components/BtnGroup";
import { useNavigate } from "react-router";
import Carousel from "../../carousel/Carousel";

const Wheel = (props) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const navigate = useNavigate();
  const [showMore,setShowMore]= useState(false)
  const ctx = useContext(StateContext);
  const { carouselAds1, carouselAds2, carouselAds3, baseUrl, marquee,moreWinnerList } = ctx;
  const apksPageHandler = () => {
    navigate("/downloadApks");
  };
  const moreWinners = moreWinnerList?.split('\n');

  const winnerList = moreWinners?.map((win,i)=>{
    return(
        <p className="wins-text" key={i}>
          {win}
        </p>
    )
  })
  const moreWinnListHandler = ()=>{
    setShowMore(!showMore)
  }
  const closeRightClick = (e) => {
    e.preventDefault();
  };
  // onContextMenu={closeRightClick}
  return (
    <Fragment>
      <div className="spin-main">
        <div className="spin-wheel-container">
          <WheelNavbar />
          <Marquee className="marquee" speed={50}>
            <span>{marquee}</span>
          </Marquee>
          <div className="wheel-main">
            <Carousel />

            <SpinWheel onShow={props.onShow} />
            <BtnGroup />
            <Top10Win />
            <p className={`more-winner`} onClick={moreWinnListHandler}> {showMore ? "Hide Winners List" : "Show More Winners List"}</p>
            <div className={`wins ${showMore ? "show" : "hide"}`}>{winnerList}</div>
            {/*<Download />*/}
          </div>
          <div
            className="download-apk-btn"
            style={{
              backgroundImage: `url(/imgs/apksDownload.png)`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
            onClick={apksPageHandler}
          ></div>
          <Footer img={"./imgs/BottomBar.png"} />
        </div>
      </div>
    </Fragment>
  );
};

export default Wheel;
