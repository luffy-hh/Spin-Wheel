import React from "react";
import './singleAppdownload.scss'


const SingleAppDownload = ({apk, name}) => {
    const apk1DownHandler = () => {
        const link = document.createElement("a");
        link.href = apk;
        link.download = name;
        link.click();
    };
    return (
        <div className='single-down-btn' style={{
            backgroundImage: `url(/imgs/download.png)`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
        }} onClick={apk1DownHandler}>

        </div>
    );
};

export default SingleAppDownload;
