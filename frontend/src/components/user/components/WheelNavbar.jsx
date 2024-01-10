import React, { Fragment } from "react";

import "./wheelNavbar.scss";

const WheelNavbar = () => {
  return (
    <Fragment>
      <div className="wheel-nav-container">
        <nav className="wheel-nav">
          <div className="menu-icon"></div>
          {/*<div className="header">Lucky spin</div>*/}
          <div className="lang-icon"></div>
        </nav>
      </div>
    </Fragment>
  );
};

export default WheelNavbar;
