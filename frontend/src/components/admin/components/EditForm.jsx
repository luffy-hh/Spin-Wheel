import React, { useContext } from "react";

import StateContext from "../../../context/StateContext";
import { useNavigate } from "react-router-dom";
import "./editForm.scss";
import { DatePicker, Space } from "antd";

const EditForm = () => {
  const ctxData = useContext(StateContext);
  const { agentReturnData, setSelectedAgentId, fetchPreset, setOutTime } =
    ctxData;
  const nav = useNavigate();
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setOutTime(dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPreset();
    nav("/admin/luckyNumber");
  };

  const options = agentReturnData.map((item, i) => {
    return (
      <option
        value={item._id}
        key={i}
        // selected={item.rewardName === id ? true : false}
      >
        {item.userName}
      </option>
    );
  });
  return (
    <div className="edit">
      <div className="heading">Edit</div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="rewardName">
          Choose Reward Name which you want to attach to Lucky Number
        </label>
        <select
          name="rewardName"
          id="rewardName"
          onChange={(e) => setSelectedAgentId(e.target.value)}
        >
          <option value="">Select</option>
          {options}
        </select>
        <Space direction="vertical" size={12}>
          <DatePicker showTime onChange={onChange} onOk={onOk} />
        </Space>
        <button className="btn ed-btn">Set</button>
      </form>
    </div>
  );
};

export default EditForm;
