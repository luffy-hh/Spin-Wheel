import React, { Fragment, useState } from "react";
import { Button, ConfigProvider, Modal } from "antd";

const DownloadPopup = (props) => {
  const handleOk = () => {
    props.setShow(false);
    props.down();
  };
  const handleCancel = () => {
    props.setShow(false);
  };
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: "#1c1917e6",
            colorText: "#fde047",
          },
        }}
      >
        <Modal
          title="Download"
          contentBg={"#1c1917"}
          open={props.show}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure to download {props.name}?</p>
        </Modal>
      </ConfigProvider>
    </Fragment>
  );
};

export default DownloadPopup;
