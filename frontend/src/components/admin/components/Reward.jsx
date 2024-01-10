import React, { useContext, useEffect, useState } from "react";
import "./reward.scss";
import StateContext from "../../../context/StateContext";
import Loading from "../../loading/Loading";

const Reward = () => {
  const [rewardName, setRewardName] = useState("");
  const [rewardQuantity, setRewardQuantity] = useState("");
  const [rewardImage, setRewardImage] = useState("");
  const [message, setMessage] = useState("");
  const [rewardStatus, setRewardStatus] = useState(false);
  const [rewardFull, setRewardFull] = useState(false);
  const ctxData = useContext(StateContext);
  const {
    rewardReturnData,
    fetchRewardData,
    rewardDel,
    baseUrl,
    token,
    loadingStatus,
    setLoadingStatus,
  } = ctxData;
  // console.log(ctxData.rewardReturnData.length);
  useEffect(() => {
    if (rewardReturnData.length === 16) {
      setRewardFull(true);
    } else {
      setRewardFull(false);
    }
  }, [rewardReturnData]);
  const handleSubmit = async (e) => {
    // console.log(rewardName, rewardQuantity, rewardImage);
    try {
      e.preventDefault();
      document.getElementById("reward-img").value = "";
      if (rewardFull) {
        setMessage("Reward Limit already full");
        setRewardStatus(true);
        setInterval(() => {
          setRewardStatus(false);
        }, 5000);
      } else {
        const rewardData = new FormData();
        rewardData.append("name", rewardName);
        rewardData.append("qty", rewardQuantity);
        rewardData.append("image", rewardImage);
        const res = await fetch(`${baseUrl}/reward/`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: rewardData,
        });
        // console.log(res.body);
        const data = await res.json();

        // console.log(data);
        if (data.status === "succeed") {
          setMessage("Reward created successfully");
          setRewardName("");
          setRewardQuantity("");
          setRewardImage("");
          setRewardStatus(true);
          setInterval(() => {
            setRewardStatus(false);
          }, 5000);
          // console.log(data);
        } else {
          setMessage(data.message);
          setRewardStatus(true);
          setInterval(() => {
            setRewardStatus(false);
          }, 5000);
        }
      }

      // console.log(data);
    } catch (err) {
      // console.log(err);
      setMessage("Something went wrong");
      setRewardStatus(true);

      setInterval(() => {
        setRewardStatus(false);
      }, 5000);
      //console.log(err);
    } finally {
      setLoadingStatus(false);
      fetchRewardData();
    }
  };

  const rewardTable =
    rewardReturnData.length > 0 ? (
      rewardReturnData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.rewardName}</td>
            <td>{item.rewardQuantity}</td>
            <td>{item.presetStatus}</td>
            <td>
              <button
                onClick={() => {
                  rewardDel(item._id);
                  //console.log(item);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    );

  return (
    <div className="rewards">
      <div className="create">
        <div className="heading">Create Reward</div>

        <div className="create-form">
          {rewardStatus && <p className="message">{message}</p>}
          {loadingStatus ? (
            <Loading />
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <label>
                <span>Reward Name</span>
                <input
                  type="text"
                  placeholder="Reward Name"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                />
              </label>
              <label>
                <span>Reward Quantity</span>
                <input
                  type="number"
                  placeholder="Reward Quantity"
                  min="1"
                  value={rewardQuantity}
                  onChange={(e) => setRewardQuantity(e.target.value)}
                />
              </label>
              <label>
                <span>Choose File</span>
                <input
                  id="reward-img"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setRewardImage(e.target.files[0])}
                />
              </label>
              <button className="btn">Create</button>
            </form>
          )}
        </div>
      </div>
      <div className="list">
        <div className="list-header">
          <div className="card-header__text">Reward Details</div>
        </div>
        <table>
          <thead>
            <tr>
              <td>No</td>
              <td>Reward Name</td>
              <td>Quantity</td>
              <td>Preset Quantity</td>
            </tr>
          </thead>
          <tbody>{loadingStatus ? <Loading /> : rewardTable}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Reward;
