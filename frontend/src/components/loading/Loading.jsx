import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Space, Spin } from "antd";

const Loading = ({ message, description }) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Spin indicator={antIcon} tip="Loading...">
        <Alert message={message} description={description} type="info" />
      </Spin>
    </Space>
  );
};

export default Loading;
