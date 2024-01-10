import React, { useContext, useState } from "react";
import "./home.scss";
import StateContext from "../../../context/StateContext";
import AdsTable from "./AdsTable";

const Home = () => {
  const [cur1ads, setCur1ads] = useState("");
  const [adsName,setAdsName]= useState('')

  const [boxAds1, setBoxAds1] = useState("");
  const [boxAds2, setBoxAds2] = useState("");
  const [boxAds3, setBoxAds3] = useState("");
  const [boxAds4, setBoxAds4] = useState("");
  const [boxAds5, setBoxAds5] = useState("");
  const [boxAds6, setBoxAds6] = useState("");
  const [apk1, setApk1] = useState("");
  const [apk2, setApk2] = useState("");
  const [apk3, setApk3] = useState("");
  const [apk4, setApk4] = useState("");
  const [apk5, setApk5] = useState("");
  const [apk6, setApk6] = useState("");
  const ctx = useContext(StateContext);
  const { changeAds, changeApks,changeApkAds ,carouselAdsArr ,apkAdsArr,deleteApkAds,deleteAds} = ctx;

  const apk1Handler = async (e) => {
    e.preventDefault();
    document.getElementById("app-down1").value = "";
    await changeApks("apk1", apk1);
  };
  const apk2Handler = async (e) => {
    e.preventDefault();
    document.getElementById("app-down2").value = "";
    await changeApks("apk2", apk2);
  };
  const apk3Handler = async (e) => {
    e.preventDefault();
    document.getElementById("app-down3").value = "";
    await changeApks("apk3", apk3);
  };
  const apk4Handler = async (e) => {
    e.preventDefault();
    document.getElementById("app-down4").value = "";
    await changeApks("apk4", apk4);
  };
  const apk5Handler = async (e) => {
    e.preventDefault();
    document.getElementById("app-down5").value = "";
    await changeApks("apk5", apk5);
  };
  const apk6Handler = async (e) => {
    e.preventDefault();
    document.getElementById("app-down6").value = "";
    await changeApks("apk6", apk6);
  };

  const curAds1Handler = async (e) => {
    e.preventDefault();
    document.getElementById("cur1ads").value = "";
    setAdsName('')
    await changeAds(adsName, cur1ads);
  };

  const boxAds1Handler = async (e) => {
    e.preventDefault();
    document.getElementById("box-ad1").value = "";
    await changeApkAds("boxad1", boxAds1);
  };
  const boxAds2Handler = async (e) => {
    e.preventDefault();
    document.getElementById("box-ad2").value = "";
    await changeApkAds("boxad2", boxAds2);
  };
  const boxAds3Handler = async (e) => {
    e.preventDefault();
    document.getElementById("box-ad3").value = "";
    await changeApkAds("boxad3", boxAds3);
  };
  const boxAds4Handler = async (e) => {
    e.preventDefault();
    document.getElementById("box-ad4").value = "";
    await changeApkAds("boxad4", boxAds4);
  };
  const boxAds5Handler = async (e) => {
    e.preventDefault();
    document.getElementById("box-ad5").value = "";
    await changeApkAds("boxad5", boxAds5);
  };
  const boxAds6Handler = async (e) => {
    e.preventDefault();
    document.getElementById("box-ad6").value = "";
    await changeApkAds("boxad6", boxAds6);
  };
  return (
    <div className="cards">
      <div className="card">
        <div className="ads-card">
          <h2>Update Ads & Apks</h2>

          <div className="ads-form-box ">
              <h4>CarouselAds</h4>
              <AdsTable data={carouselAdsArr} action={deleteAds}/>

              <h4>Apk Ads</h4>
            <AdsTable data={apkAdsArr} action={deleteApkAds}/>
            <form onSubmit={curAds1Handler} className="ad-form">
              <label htmlFor="cur1ads">
                <span>Carousel Ads</span>
                <input type='string' placeholder='Ads name' value={adsName} onChange={(e)=>setAdsName(e.target.value)}/>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="cur1ads"
                  id="cur1ads"
                  onChange={(e) => {
                    setCur1ads(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={boxAds1Handler} className="ad-form">
              <label htmlFor="box-ad1">
                <span>Box Ads-1</span>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="box-ad1"
                  id="box-ad1"
                  onChange={(e) => {
                    setBoxAds1(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={boxAds2Handler} className="ad-form">
              <label htmlFor="box-ad2">
                <span>Box Ads-2</span>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="box-ad2"
                  id="box-ad2"
                  onChange={(e) => {
                    setBoxAds2(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={boxAds3Handler} className="ad-form">
              <label htmlFor="box-ad3">
                <span>Box Ads-3</span>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="box-ad3"
                  id="box-ad3"
                  onChange={(e) => {
                    setBoxAds3(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={boxAds4Handler} className="ad-form">
              <label htmlFor="box-ad4">
                <span>Box Ads-4</span>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="box-ad4"
                  id="box-ad4"
                  onChange={(e) => {
                    setBoxAds4(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={boxAds5Handler} className="ad-form">
              <label htmlFor="box-ad5">
                <span>Box Ads-5</span>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="box-ad5"
                  id="box-ad5"
                  onChange={(e) => {
                    setBoxAds5(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={boxAds6Handler} className="ad-form">
              <label htmlFor="box-ad6">
                <span>Box Ads-6</span>
                <input
                  type="file"
                  placeholder="Ad Image"
                  name="box-ad6"
                  id="box-ad6"
                  onChange={(e) => {
                    setBoxAds6(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={apk1Handler} className="ad-form">
              <label htmlFor="app-down1">
                <span>Download App 1</span>
                <input
                  type="file"
                  placeholder="App File"
                  name="app-down1"
                  id="app-down1"
                  onChange={(e) => {
                    setApk1(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={apk2Handler} className="ad-form">
              <label htmlFor="app-down2">
                <span>Download App 2</span>
                <input
                  type="file"
                  placeholder="App File"
                  name="app-down2"
                  id="app-down2"
                  onChange={(e) => {
                    setApk2(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={apk3Handler} className="ad-form">
              <label htmlFor="app-down3">
                <span>Download App 3</span>
                <input
                  type="file"
                  placeholder="App File"
                  name="app-down3"
                  id="app-down3"
                  onChange={(e) => {
                    setApk3(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={apk4Handler} className="ad-form">
              <label htmlFor="app-down4">
                <span>Download App 4</span>
                <input
                  type="file"
                  placeholder="App File"
                  name="app-down4"
                  id="app-down4"
                  onChange={(e) => {
                    setApk4(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={apk5Handler} className="ad-form">
              <label htmlFor="app-down5">
                <span>Download App 5</span>
                <input
                  type="file"
                  placeholder="App File"
                  name="app-down5"
                  id="app-down5"
                  onChange={(e) => {
                    setApk5(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={apk6Handler} className="ad-form">
              <label htmlFor="app-down6">
                <span>Download App 6</span>
                <input
                  type="file"
                  placeholder="App File"
                  name="app-down6"
                  id="app-down6"
                  onChange={(e) => {
                    setApk6(e.target.files[0]);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
