import React from "react";
import { Layout, Menu } from "antd";
import PeoplePage from "./PeoplePage/PeoplePage";

import "antd/dist/antd.css";
import "./rtl.scss";
import "./App.scss";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item> מנהל אנשי חוץ </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <PeoplePage />
      </Content>
      <Footer>Bis Hibur ©2019 Created by Nir Geller</Footer>
    </Layout>
  );
};

export default App;
