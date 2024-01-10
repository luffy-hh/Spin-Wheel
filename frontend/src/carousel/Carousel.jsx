import useEmblaCarousel from "embla-carousel-react";
import React, { Fragment, useContext } from "react";
import Autoplay from "embla-carousel-autoplay";
import StateContext from "../context/StateContext";
import "./carousel.scss";

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const ctx = useContext(StateContext);
  const { carouselAdsArr } = ctx;

  return (
    <Fragment>
      <div className=" ads embla" ref={emblaRef}>
        <div className="ads-item embla__container" id="item">
          {
            carouselAdsArr?.map(ad=>(
                <div className="embla__slide ads-item-img">
                    <img src={ad.url} alt={ad.name}/>
                </div>
            ))
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Carousel;
