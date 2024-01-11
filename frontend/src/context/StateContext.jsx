import { useEffect, useState } from "react";
import { createContext } from "react";

const StateContext = createContext();

// https://aphoegyi.com:5000
// http://localhost:5000

const baseUrl = "https://aphoegyi.com/v1.1";

export const StateContextProvider = ({ children }) => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [luckyData, setLuckyData] = useState([]);
  const [rewardReturnData, setRewardReturnData] = useState([]);
  const [agentReturnData, setAgentReturnData] = useState([]);
  const [editNumber, setEditNumber] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [outTime, setOutTime] = useState("");
  const [userNameEntered, setUserNameEntered] = useState("");
  const [userPasswordEntered, setUserPasswordEntered] = useState("");
  const [login, setLogin] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentPassword, setAgentPassword] = useState("");
  const [loginUser, setLoginUser] = useState([]);
  const [reqNum, setReqNum] = useState({});
  const [reportData, setReportData] = useState([]);
  const [loginAgain, setLoginAgain] = useState(false);
  const [enteredLucky, setEnteredLucky] = useState("");
  const [usedLucky, setUsedLucky] = useState({});
  const [userReward, setUserReward] = useState({});
  const [uiReward, setUiReward] = useState([]);
  const [deg, setDeg] = useState(0);
  const [token, setToken] = useState("");
  const [carouselAdsArr, setCarouselAdsArr] = useState([]);
  const [apkAdsArr, setApkAdsArr] = useState([]);
  const [boxAds1, setBoxAds1] = useState("");
  const [boxAds2, setBoxAds2] = useState("");
  const [boxAds3, setBoxAds3] = useState("");
  const [boxAds4, setBoxAds4] = useState("");
  const [boxAds5, setBoxAds5] = useState("");
  const [boxAds6, setBoxAds6] = useState("");
  const [downloadApk1, setDownloadApk1] = useState("");
  const [downloadApk2, setDownloadApk2] = useState("");
  const [downloadApk3, setDownloadApk3] = useState("");
  const [downloadApk4, setDownloadApk4] = useState("");
  const [downloadApk5, setDownloadApk5] = useState("");
  const [downloadApk6, setDownloadApk6] = useState("");
  const [marquee, setMarquee] = useState(
    "Hello my friend, welcome to my lucky spin game. You can spin the wheel and win a prize. Enjoy your time and good luck!"
  );
  const [top1Name, setTop1Name] = useState("Not Yet");
  const [top2Name, setTop2Name] = useState("Not Yet");
  const [top3Name, setTop3Name] = useState("Not Yet");
  const [top4Name, setTop4Name] = useState("Not Yet");
  const [top5Name, setTop5Name] = useState("Not Yet");
  const [top6Name, setTop6Name] = useState("Not Yet");
  const [top7Name, setTop7Name] = useState("Not Yet");
  const [top8Name, setTop8Name] = useState("Not Yet");
  const [top9Name, setTop9Name] = useState("Not Yet");
  const [top10Name, setTop10Name] = useState("Not Yet");
  const [moreWinnerList, setMoreWinnerList] = useState("");
  const [uiAgent, setUiAgent] = useState([]);
  const [policy, setPolicy] = useState("");

  // console.log(marquee);
  // console.log(loginUser);

  // update report i think
  // async function sendData() {
  //   const uptData = { reward: userReward, lucky: usedLucky };
  //   // console.log(uptData);
  //   const res = await fetch(baseUrl + "/update_data", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(uptData),
  //   });
  //   const data = await res.json();
  //   // console.log(data.message);
  //   fetchReportsForAdmin();
  // }

  async function checkLuckyAvailability() {
    try {
      const res = await fetch(baseUrl + "/luckyNumbers/fromUi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: enteredLucky }),
      });
      const data = await res.json();

      if (data.message) {
        alert(data.message);
      } else {
        // console.log(userReward);
        let randomReward;
        const index = uiReward.findIndex(
          (item) => item._id === data.data.rewardId?._id
        );
        // console.log(data.data.rewardId._id);
        // console.log(uiReward, index);
        const randomDeg = 18000 - (index + 1) * 22.5;
        setDeg(randomDeg);
        setUsedLucky(data.data);
        setUserReward(data.data.rewardId);
        // console.log(data, randomDeg);
      }
    } catch (e) {
      // console.log(e);
      alert(e.message);
    }
  }

  function rotate() {
    //console.log(deg);
    document.querySelector(".wheel-img").style.transform = `rotate(${deg}deg)`;
    document.querySelector(".wheel-img").style.transition =
      "all 10s ease-in-out";
    document.querySelector(".labels").style.transition = "all 10s ease-in-out";
    document.querySelector(".labels").style.transform = `rotate(${deg}deg)`;
    // document.querySelector(".pointer").style.transitionDelay = "0.5s";
    // document.querySelector(".wheel").style.transitionDelay = "0.5s";
    document.querySelector(".wheel-img").style.transitionDuration = "10s";
    document.querySelector(".labels").style.transitionDuration = "10s";
    document.querySelector(".wheel-img").style.transitionTimingFunction =
      "ease-in-out";
    document.querySelector(".labels").style.transitionTimingFunction =
      "ease-in-out";
  }
  // modify Terms
  async function modifyTerms(name, terms) {
    const dataObj = { name, terms };
    const res = await fetch(baseUrl + "/uiControl/terms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    //console.log(data);
    await fetchTerms();
  }

  // fetch terms
  async function fetchTerms() {
    const res = await fetch(baseUrl + "/uiControl/terms");
    const data = await res.json();
    // console.log(data.data);
    data.data.length > 0 && setPolicy(data.data[0].terms);
  }

  // Modify uiAgent List
  async function modifyUiAgent(name, phNum) {
    const dataObj = { name, phNum };
    const res = await fetch(baseUrl + "/uiControl/uiAgent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    // console.log(data);
    await fetchUiAgents();
  }

  //Get all uiAgents
  async function fetchUiAgents() {
    const res = await fetch(baseUrl + "/uiControl/uiAgent");
    const data = await res.json();
    // console.log(data);
    data.data.length > 0 && setUiAgent(data.data);
    if (data.err) {
      alert(data.msg);
      //console.log(data.err, data.msg);
    }
  }

  //get top10
  async function fetchTop10() {
    const res = await fetch(baseUrl + "/uiControl/top10", {
      method: "GET",
    });
    const data = await res.json();
    // console.log(data, "top 10");
    const top10AllData = data.data;
    const top1 = top10AllData.find((data) => data.top === "top1" || null);
    const top2 = top10AllData.find((data) => data.top === "top2" || null);
    const top3 = top10AllData.find((data) => data.top === "top3" || null);
    const top4 = top10AllData.find((data) => data.top === "top4" || null);
    const top5 = top10AllData.find((data) => data.top === "top5" || null);
    const top6 = top10AllData.find((data) => data.top === "top6" || null);
    const top7 = top10AllData.find((data) => data.top === "top7" || null);
    const top8 = top10AllData.find((data) => data.top === "top8" || null);
    const top9 = top10AllData.find((data) => data.top === "top9" || null);
    const top10 = top10AllData.find((data) => data.top === "top10" || null);
    top1 !== undefined &&
      top1.winnerName !== undefined &&
      setTop1Name(top1.winnerName);
    top2 !== undefined &&
      top1.winnerName !== undefined &&
      setTop2Name(top2.winnerName);
    top3 !== undefined &&
      top1.winnerName !== undefined &&
      setTop3Name(top3.winnerName);
    top4 !== undefined &&
      top1.winnerName !== undefined &&
      setTop4Name(top4.winnerName);
    top5 !== undefined &&
      top1.winnerName !== undefined &&
      setTop5Name(top5.winnerName);
    top6 !== undefined &&
      top1.winnerName !== undefined &&
      setTop6Name(top6.winnerName);
    top7 !== undefined &&
      top1.winnerName !== undefined &&
      setTop7Name(top7.winnerName);
    top8 !== undefined &&
      top1.winnerName !== undefined &&
      setTop8Name(top8.winnerName);
    top9 !== undefined &&
      top1.winnerName !== undefined &&
      setTop9Name(top9.winnerName);
    top10 !== undefined &&
      top1.winnerName !== undefined &&
      setTop10Name(top10.winnerName);
  }

  //change top10
  async function updateTop10(top, winnerName) {
    const topObj = { top, winnerName };
    const res = await fetch(baseUrl + "/uiControl/top10", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(topObj),
    });
    const data = await res.json();
    //console.log(data);
    await fetchTop10();
  }

  //get marquee
  async function fetchMarquee() {
    const res = await fetch(baseUrl + "/uiControl/marquee", {
      method: "GET",
    });
    const data = await res.json();
    //console.log(data);
    const text = data?.data[0]?.text;
    text && setMarquee(text);
  }

  //change marquee
  async function changeMarquee(name, text) {
    const marqueeObj = { name, text };
    const res = await fetch(baseUrl + "/uiControl/marquee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(marqueeObj),
    });
    const data = await res.json();
    //console.log(data);
    await fetchMarquee();
  }

  // change apks
  async function changeApks(name, apk) {
    const apkData = new FormData();
    apkData.append("name", name);
    apkData.append("apk", apk);
    const res = await fetch(baseUrl + "/apksControl", {
      method: "POST",
      body: apkData,
    });
    const data = await res.json();
    // console.log(data);

    await fetchApks();
  }

  //get all apks
  async function fetchApks() {
    const res = await fetch(baseUrl + "/apksControl", {
      method: "GET",
    });
    const data = await res.json();
    // console.log(data);
    const apkAllData = data.data;
    const apk1 = apkAllData.find((apk) => apk.name === "apk1");
    const apk2 = apkAllData.find((apk) => apk.name === "apk2");
    const apk3 = apkAllData.find((apk) => apk.name === "apk3");
    const apk4 = apkAllData.find((apk) => apk.name === "apk4");
    const apk5 = apkAllData.find((apk) => apk.name === "apk5");
    const apk6 = apkAllData.find((apk) => apk.name === "apk6");
    apk1 && setDownloadApk1(apk1?.url);
    apk2 && setDownloadApk2(apk2?.url);
    apk3 && setDownloadApk3(apk3?.url);
    apk4 && setDownloadApk4(apk4?.url);
    apk5 && setDownloadApk5(apk5?.url);
    apk6 && setDownloadApk6(apk6?.url);
  }

  // change ads
  async function changeAds(name, image) {
    const adsData = new FormData();
    adsData.append("name", name);
    adsData.append("image", image);
    const res = await fetch(baseUrl + "/ads", {
      method: "POST",
      body: adsData,
    });
    const data = await res.json();
    // console.log(data);
    await fetchAds();
  }

  // change apkads
  async function changeApkAds(name, image) {
    const adsData = new FormData();
    adsData.append("name", name);
    adsData.append("image", image);
    const res = await fetch(baseUrl + "/ads/apkAds", {
      method: "POST",
      body: adsData,
    });
    const data = await res.json();
    // console.log(data);
    await fetchApkAds();
  }

  // get all ads
  async function fetchAds() {
    const res = await fetch(baseUrl + "/ads", {
      method: "GET",
    });
    const data = await res.json();
    // console.log(data.result);
    const allAds = data.data;
    setCarouselAdsArr(allAds);

    // curAds1 && setCarouselAds1(curAds1?.url);
    // curAds2 && setCarouselAds2(curAds2?.url);
    // curAds3 && setCarouselAds3(curAds3?.url);
  }

  // delete an ads
  async function deleteAds(id) {
    try {
      //console.log(id);
      const obj = { id: id };
      //console.log(obj);
      const res = await fetch(baseUrl + "/ads/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      const json = await res.json();
      alert(json.message);
      await fetchAds();
    } catch (e) {
      alert(e.message);
      throw new Error(e);
    }
  }

  // get all apkAds
  async function fetchApkAds() {
    try {
      const res = await fetch(baseUrl + "/ads/apkAds", {
        method: "GET",
      });
      const dataArr = await res.json();

      const allAds = dataArr.data;
      //console.log(dataArr);
      setApkAdsArr(allAds);
      const boxAds1 =
        allAds.length > 0 && allAds.find((ads) => ads.name === "boxad1");
      const boxAds2 =
        allAds.length > 0 && allAds.find((ads) => ads.name === "boxad2");
      const boxAds3 =
        allAds.length > 0 && allAds.find((ads) => ads.name === "boxad3");
      const boxAds4 =
        allAds.length > 0 && allAds.find((ads) => ads.name === "boxad4");
      const boxAds5 =
        allAds.length > 0 && allAds.find((ads) => ads.name === "boxad5");
      const boxAds6 =
        allAds.length > 0 && allAds.find((ads) => ads.name === "boxad6");
      boxAds1 && setBoxAds1(boxAds1?.url);
      boxAds2 && setBoxAds2(boxAds2?.url);
      boxAds3 && setBoxAds3(boxAds3?.url);
      boxAds4 && setBoxAds4(boxAds4?.url);
      boxAds5 && setBoxAds5(boxAds5?.url);
      boxAds6 && setBoxAds6(boxAds6?.url);
    } catch (e) {
      throw new Error(e);
    }
  }
  //delete an apkAds
  async function deleteApkAds(id) {
    try {
      const obj = { id: id };
      const res = await fetch(baseUrl + "/ads/apkAds/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      const json = await res.json();
      alert(json.message);
      await fetchApkAds();
    } catch (e) {
      alert(e.message);
      throw new Error(e);
    }
  }
  // Set For an Agent
  async function fetchPreset() {
    //console.log(editNumber, selectedRewardId, selectedReward);

    // console.log(neededData);
    const res = await fetch(baseUrl + "/luckyNumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        luckyId: editNumber,
        agentId: selectedAgentId,
        outTime,
      }),
    });
    const data = await res.json();
    //console.log(data);
    await fetchLuckyData();
    await fetchRewardData();
  }

  // // create agent
  async function fetchCreate() {
    const agentData = { userName: agentName, password: agentPassword };
    const res = await fetch(baseUrl + "/admin/createAgent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(agentData),
    });
    const data = await res.json();
    //console.log(data);
    await fetchAgentsData();
  }

  // get all luckyNumber
  async function fetchLuckyData() {
    // setLoadingStatus(true); // Set loadingStatus to true before making the request.

    try {
      const res = await fetch(`${baseUrl}/luckyNumbers`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "succeed") {
          // console.log(data.data.allLuckyNumber);
          setLuckyData(data.data.allLuckyNumber);
        } else {
          // console.log(data.message);
          alert(data.message);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // get all rewards
  async function fetchRewardData() {
    const res = await fetch(`${baseUrl}/reward`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
        Accept: "application/json, text/html",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "succeed") {
      setRewardReturnData(data.data.allRewards);
    } else {
      console.log(data.message);
    }
    // const img = `${baseUrl}/`+ data.result[0].image;

    // console.log(data.result);
  }

  // get reward for ui
  async function fetchRewardForUi() {
    const res = await fetch(`${baseUrl}/reward/uiReward`);
    const data = await res.json();
    // console.log(data);
    setUiReward(data.allRewards);
  }

  async function updateDraw(data) {
    const res = await fetch(baseUrl + "/admin/reportForAgent", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: data._id }),
    });
    const resData = res.json();
    //console.log(resData);
    await getReportForAgent();
  }

  // get all reports
  async function fetchReportsForAdmin() {
    const res = await fetch(`${baseUrl}/admin/report`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
        Accept: "application/json, text/html",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "succeed") {
      setReportData(data.allReports);
    } else {
      alert(data.message);
    }
    // console.log(data);
  }
  // get report for agent
  async function getReportForAgent() {
    const res = await fetch(`${baseUrl}/admin/reportForAgent`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "succeed") {
      setReportData(data.returnReports);
    } else {
      alert(data.message);
    }
  }
  // Modify More Winners list
  async function modifyMoreWinner(name, moreWin) {
    try {
      const data = { name, moreWin };
      const res = await fetch(baseUrl + "/uiControl/moreWinner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
    } catch (e) {
      alert(e.message);
    }
  }
  // Get More Winners List
  async function getMoreWinner() {
    try {
      const res = await fetch(baseUrl + "/uiControl/moreWinner");
      const data = await res.json();
      setMoreWinnerList(data?.data[0]?.moreWin);
    } catch (e) {
      alert(e.message);
    }
  }
  //useEffect for admin
  useEffect(() => {
    loginUser.role === "Admin" && fetchLuckyData();
    loginUser.role === "Admin" && fetchAgentsData();
    loginUser.role === "Admin" && fetchRewardData();
    loginUser.role === "Admin" && fetchReportsForAdmin();
    loginUser.role === "Agent" && getReportForAgent();
  }, [loginUser]);

  // useEffect for ui
  useEffect(() => {
    getMoreWinner();
    fetchRewardForUi();
    fetchAds();
    fetchApkAds();
    fetchApks();
    fetchMarquee();
    fetchTop10();
    fetchUiAgents();
    fetchTerms();
  }, []);
  // // function for each button
  async function banHandler(id) {
    //console.log(data);
    const res = await fetch(`${baseUrl}/luckyNumbers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const resData = await res.json();
    //console.log(resData);
    await fetchLuckyData();
    await fetchRewardData();
  }

  // lucky number change handler
  async function changeHandler(data) {
    // console.log(data._id);
    const res = await fetch(`${baseUrl}/luckyNumbers`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: data._id }),
    });
    const resData = await res.json();
    // console.log(resData);
    await fetchLuckyData();
    await fetchRewardData();
  }

  // get agent data
  async function fetchAgentsData() {
    const res = await fetch(`${baseUrl}/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "succeed") {
      setAgentReturnData(data.allAgents);
    } else {
      console.log("Something went wrong");
    }
  }

  //login handler
  async function loginFetch() {
    const data = { userName: userNameEntered, password: userPasswordEntered };
    try {
      setLoadingStatus(true);
      //deploy https://wheel-server.onrender.com
      //`${baseUrl}`
      const res = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      const jsonData = await res.json();
      const user = jsonData.admin;
      const token = jsonData.token;

      if (jsonData.status === "Success") {
        await getLoginUserData(token, user);
      } else {
        setLoadingStatus(false);
        console.log(jsonData.message);
      }
    } catch (err) {
      console.log(err, "Request Failed");
    } finally {
      setLoadingStatus(false);
    }
  }

  // get login User Data

  async function getLoginUserData(token, user) {
    const res2 = await fetch(`${baseUrl}/admin/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await res2.json();
    if (userData?.status === "failed") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      setLogin(false);
      setLoginAgain(true);
    } else {
      setLogin(true);
      setLoginUser(userData.user);

      // setLoginUser(jsonData.admin);
      setToken(token);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(userData.user));
    }
    // console.log(userData);
  }

  // working with Token and user
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const user = JSON?.parse(window.localStorage.getItem("user"));

    // console.log(user);
    if (token) {
      getLoginUserData(token, user);
      // setToken(token);
      // setLogin(true);
      // setLoginUser(user);
    } else {
      setLogin(false);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    }
  }, [token]);

  // get random for agent
  async function requestNumberHandler() {
    const res = await fetch(`${baseUrl}/luckyNumbers/getRandom`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data.updatedLucky);
    if (data.status === "Succeed") {
      setReqNum(data.updatedLucky);
      // await createReport(data.updatedLucky._id);
    } else {
      console.log(data.message);
    }

    //console.log(neededData);

    await getReportForAgent();
  }

  // delete reward and its relating luckyNumbers
  async function rewardDel(id) {
    // console.log(id);
    const res = await fetch(`${baseUrl}/reward`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const resData = await res.json();
    //console.log(resData);
    await fetchRewardData();
    await fetchLuckyData();
    await fetchReportsForAdmin();
  }

  const data = {
    rotate,
    changeHandler,
    loginUser,
    loadingStatus,
    setLoadingStatus,
    luckyData,
    setDeg,
    setSelectedAgentId,
    rewardReturnData,
    fetchRewardData,
    banHandler,
    setEditNumber,
    fetchPreset,
    fetchCreate,
    setAgentName,
    setAgentPassword,
    fetchAgentsData,
    agentReturnData,
    updateDraw,
    agentName,
    agentPassword,
    setUserNameEntered,
    setUserPasswordEntered,
    loginFetch,
    login,
    requestNumberHandler,
    reqNum,
    reportData,
    fetchLuckyData,
    rewardDel,
    setEnteredLucky,
    uiReward,
    setOutTime,
    // used,
    // sendData,
    usedLucky,
    userReward,
    deg,
    setLogin,
    baseUrl,
    token,
    carouselAdsArr,
    changeAds,
    boxAds1,
    boxAds2,
    boxAds3,
    boxAds4,
    boxAds5,
    boxAds6,
    changeApks,
    downloadApk1,
    downloadApk2,
    downloadApk3,
    downloadApk4,
    downloadApk5,
    downloadApk6,
    marquee,
    setMarquee,
    checkLuckyAvailability,
    changeMarquee,
    updateTop10,
    top1Name,
    top2Name,
    top3Name,
    top4Name,
    top5Name,
    top6Name,
    top7Name,
    top8Name,
    top9Name,
    top10Name,
    modifyUiAgent,
    modifyTerms,
    uiAgent,
    policy,
    enteredLucky,
    loginAgain,
    setLoginAgain,
    apkAdsArr,
    deleteApkAds,
    deleteAds,
    changeApkAds,
    moreWinnerList,
    modifyMoreWinner,
  };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export default StateContext;
