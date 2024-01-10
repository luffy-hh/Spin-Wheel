import React, { useContext, useState } from "react";
import "./top10.scss";
import StateContext from "../../../context/StateContext";

const Top10 = () => {
  const [text, setText] = useState("");
  const [top1, setTop1] = useState("");
  const [top2, setTop2] = useState("");
  const [top3, setTop3] = useState("");
  const [top4, setTop4] = useState("");
  const [top5, setTop5] = useState("");
  const [top6, setTop6] = useState("");
  const [top7, setTop7] = useState("");
  const [top8, setTop8] = useState("");
  const [top9, setTop9] = useState("");
  const [top10, setTop10] = useState("");
  const [moreWinner,setMoreWinner]= useState('')
  const ctx = useContext(StateContext);
  const { changeMarquee, updateTop10,modifyMoreWinner } = ctx;
  const textHandler = (e) => {
    e.preventDefault();
    changeMarquee("marquee", text);
    setText("");
  };
  const top1Handler = (e) => {
    e.preventDefault();
    updateTop10("top1", top1);
  };
  const top2Handler = (e) => {
    e.preventDefault();
    updateTop10("top2", top2);
  };
  const top3Handler = (e) => {
    e.preventDefault();
    updateTop10("top3", top3);
  };
  const top4Handler = (e) => {
    e.preventDefault();
    updateTop10("top4", top4);
  };
  const top5Handler = (e) => {
    e.preventDefault();
    updateTop10("top5", top5);
  };
  const top6Handler = (e) => {
    e.preventDefault();
    updateTop10("top6", top6);
  };
  const top7Handler = (e) => {
    e.preventDefault();
    updateTop10("top7", top7);
  };
  const top8Handler = (e) => {
    e.preventDefault();
    updateTop10("top8", top8);
  };
  const top9Handler = (e) => {
    e.preventDefault();
    updateTop10("top9", top9);
  };
  const top10Handler = (e) => {
    e.preventDefault();
    updateTop10("top10", top10);
  };
  const moreWinnerHandler = (e)=>{
    e.preventDefault();
    modifyMoreWinner("More Winner",moreWinner)
    setMoreWinner('')
  }
  return (
    <div className="cards">
      <div className="card">
        <div className="card-create">
          <h2>Modify More Winners List</h2>
          <form className="form" onSubmit={(e)=>moreWinnerHandler(e)}>
            <label htmlFor="terms">Enter Winner List</label>
            <textarea
                name="winners"
                id="winners"
                cols="50"
                rows="10"
                value={moreWinner}
                onChange={(e) => {
                  setMoreWinner(e.target.value);
                }}
            ></textarea>

            <button className="btn">Confirm</button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="ads-card">
          <h2>Update Top 10 & Running Text</h2>
          <div className="ads-form-box ">
            <form className="ad-form" onSubmit={textHandler}>
              <label htmlFor="marquee">
                <span>Running Text</span>
                <input
                  type="text"
                  placeholder="Enter Text"
                  name="marquee"
                  id="marquee"
                  value={text}
                  onChange={(e) => {
                    //console.log(e.target.value);
                    setText(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top1Handler} className="ad-form">
              <label htmlFor="top1">
                <span>Top-1</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top1"
                  id="top1"
                  value={top1}
                  onChange={(e) => {
                    setTop1(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top2Handler} className="ad-form">
              <label htmlFor="top2">
                <span>Top-2</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top2"
                  id="top2"
                  value={top2}
                  onChange={(e) => {
                    setTop2(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top3Handler} className="ad-form">
              <label htmlFor="top3">
                <span>Top-3</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top3"
                  id="top3"
                  value={top3}
                  onChange={(e) => {
                    setTop3(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top4Handler} className="ad-form">
              <label htmlFor="top4">
                <span>Top-4</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top4"
                  id="top4"
                  value={top4}
                  onChange={(e) => {
                    setTop4(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top5Handler} className="ad-form">
              <label htmlFor="top5">
                <span>Top-5</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top5"
                  id="top5"
                  value={top5}
                  onChange={(e) => {
                    setTop5(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top6Handler} className="ad-form">
              <label htmlFor="top6">
                <span>Top-6</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top6"
                  id="top6"
                  value={top6}
                  onChange={(e) => {
                    setTop6(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top7Handler} className="ad-form">
              <label htmlFor="top7">
                <span>Top-7</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top7"
                  id="top7"
                  value={top7}
                  onChange={(e) => {
                    setTop7(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top8Handler} className="ad-form">
              <label htmlFor="top8">
                <span>Top-8</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top8"
                  id="top8"
                  value={top8}
                  onChange={(e) => {
                    setTop8(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top9Handler} className="ad-form">
              <label htmlFor="top9">
                <span>Top-9</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top9"
                  id="top9"
                  value={top9}
                  onChange={(e) => {
                    setTop9(e.target.value);
                  }}
                />
              </label>
              <button className="btn btn-change">Change</button>
            </form>
            <form onSubmit={top10Handler} className="ad-form">
              <label htmlFor="top10">
                <span>Top-10</span>
                <input
                  type="text"
                  placeholder="Winner Name"
                  name="top10"
                  id="top10"
                  value={top10}
                  onChange={(e) => {
                    setTop10(e.target.value);
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

export default Top10;
