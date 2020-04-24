import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Spin } from "antd";

import "./AppLoader.scss";

const AppLoader: React.FC = ({ children }) => {
  const { loading } = useContext(UserContext);

  return (
    <Spin wrapperClassName="app-spinner" spinning={loading}>
      {children}
    </Spin>
  );
};

export default AppLoader;
