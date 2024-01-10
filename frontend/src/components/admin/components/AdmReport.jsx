import React, {useContext, useRef, useState} from "react";
import StateContext from "../../../context/StateContext";
import { FcSearch } from "react-icons/fc";
import "./admReport.scss";
import {DownloadTableExcel} from "react-export-table-to-excel";

const AdmReport = () => {
  const ctxData = useContext(StateContext);
  const [adSearch, setAdSearch] = useState(null);
  const { reportData, agentReturnData, rewardReturnData, luckyData } = ctxData;
    const tableRef = useRef(null);
    console.log(tableRef)
  // console.log(reportData, agentReturnData, rewardReturnData, luckyData);
  const searchHandler = (e) => {
    const input = e.target.value;
    const luckySearch = luckyData.find((l) => l.redeemCode === input);
    // console.log(luckySearch);
    const searchReport =
      luckySearch &&
      reportData.find((rp) => rp.luckyNumber === luckySearch._id);
    setAdSearch(searchReport);
    // console.log(searchReport);
  };
  const searchLucky =
    adSearch && luckyData.filter((l) => adSearch.luckyNumber === l._id);
  const searchReward =
    adSearch &&
    rewardReturnData.filter((r) =>
      adSearch.reward !== null ? adSearch.reward === r._id : null
    );
  const searchAgent =
    adSearch && agentReturnData.find((ag) => ag._id === adSearch.agent);
  // console.log(searchLucky, searchReward, searchAgent);
  const admSearch = adSearch ? (
    <tr>
      <td>{searchLucky.length > 0 && searchLucky[0].redeemCode}</td>
      <td>{new Date(adSearch.requested).toLocaleDateString()}</td>
      <td>{new Date(adSearch.requested).toLocaleTimeString()}</td>
      <td>{searchAgent && searchAgent.userName}</td>
      <td>{searchReward.length > 0 ? searchReward[0].rewardName : "-"}</td>
    </tr>
  ) : null;
  const requestOfAgent = reportData ? (
    reportData.map((rp, i) => {
      const agent = agentReturnData.find((ag) => ag._id === rp.agent);
      const code = luckyData.find((lc) => lc._id === rp.luckyNumber);
      const reward = rp.reward
        ? rewardReturnData.find((r) => rp.reward === r._id)
        : null;
      // console.log("code:", code, "agent:", agent, "reward:", reward);
      return (
        <tr key={i}>
          <td>{code.redeemCode}</td>
          <td>{new Date(rp.requested).toLocaleDateString()}</td>
          <td>{new Date(rp.requested).toLocaleTimeString()}</td>
          <td>{agent.userName}</td>
          <td>{reward ? reward.rewardName : "-"}</td>
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
    <div className="card">
      <h1>Reports</h1>
      <div className="search-box">
        <input
          className="search"
          type="text"
          placeholder="Search Lucky Number"
          onChange={searchHandler}
        />
        <FcSearch className="search-icon" />
      </div>
      <div className="table">
          <DownloadTableExcel
              filename="ReportsAll"
              sheet="reports"
              currentTableRef={tableRef.current}
          >
              <button> Export to excel </button>
          </DownloadTableExcel>
        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Lucky Number</td>
              <td>Date</td>
              <td>Time</td>
              <td>Agent</td>
              <td>Reward</td>
            </tr>
          </thead>
          <tbody>{admSearch ? admSearch : requestOfAgent}</tbody>
          {/**/}
        </table>
      </div>
    </div>
  );
};

export default AdmReport;
