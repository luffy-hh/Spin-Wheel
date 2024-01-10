import React, { useCallback, useContext, useState } from "react";
import { Button, Modal } from "antd";
import StateContext from "../../context/StateContext";
import { useNavigate } from "react-router";

const LoginAgain = () => {
  const ctx = useContext(StateContext);
  const { loginAgain, setLoginAgain } = ctx;
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        title="Please Login Again."
        centered
        open={loginAgain}
        onOk={() => {
          setLoginAgain(false);
          navigate("/admin");
        }}
      >
        <p>Your Session is Expired. Please Login Again.</p>
      </Modal>
    </div>
  );
};

export default LoginAgain;
