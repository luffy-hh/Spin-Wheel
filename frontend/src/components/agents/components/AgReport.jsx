import React, { useContext, useEffect, useState } from "react";
import StateContext from "../../../context/StateContext";
import { FcSearch } from "react-icons/fc";
import "./agReport.scss";

const AgReport = () => {
  const ctxData = useContext(StateContext);
  const [search, setSearch] = useState("");
  const { reportData, loginUser, luckyData, rewardReturnData, updateDraw } =
    ctxData;
  // console.log(reportData, loginUser, luckyData);
  // const rpForEach = reportData?.map((rp, i) =>
  //   rp.agent === loginUser.userName ? rp : null
  // );
  //console.log(rpForEach);
  const searchHandler = (e) => {
    const input = e.target.value;
    const searchReport = reportData?.find((rp) => rp?.luckyNumber === input);

    searchReport ? setSearch(searchReport) : setSearch("");
    // console.log(searchReport);
  };
  // const searchLucky =
  //   search !== "" &&
  //   luckyData.filter((l) => search.luckyNumber === l.redeemCode);
  // const searchReward =
  //   search !== "" && rewardReturnData.filter((r) => search.reward === r.id);
  const agSearch = search ? (
    <tr>
      <td>{search.luckyNumber}</td>
      <td>{new Date(search.requested).toLocaleDateString()}</td>
      <td>{new Date(search.requested).toLocaleTimeString()}</td>
      <td>{search?.reward ? search?.reward : "-"}</td>
      <td>
        <span>{search.draw ? "ထုတ်ပြီး" : "မထုတ်ရသေး"}</span>
        {!search.draw && search?.reward && (
          <button
            onClick={() => {
              updateDraw(search);
              setSearch("");
            }}
          >
            Change
          </button>
        )}
      </td>
    </tr>
  ) : null;

  const requestOfUser =
    reportData?.length > 0 ? (
      reportData?.map((rp, i) => {
        return (
          <tr key={i}>
            <td>{rp.luckyNumber}</td>
            <td>{new Date(rp.requested).toLocaleDateString()}</td>
            <td>{new Date(rp.requested).toLocaleTimeString()}</td>
            <td>{rp.reward !== null ? rp.reward : "-"}</td>
            <td>
              <span>{rp.draw ? "ထုတ်ပြီး" : "မထုတ်ရသေး"}</span>
              {!rp.draw && rp?.reward && (
                <button onClick={() => updateDraw(rp)}>Change</button>
              )}
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
        <table>
          <thead>
            <tr>
              <td>Lucky Number</td>
              <td>Date</td>
              <td>Time</td>
              <td>Reward</td>
              <td>Prize Draw</td>
            </tr>
          </thead>
          <tbody>{agSearch ? agSearch : requestOfUser}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AgReport;
