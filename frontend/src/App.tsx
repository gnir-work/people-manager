import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { getPeople } from "./api/people";
import PeopleTable from "./components/PeopleTable/PeopleTable";

import "antd/dist/antd.css";
import "./rtl.scss";
import "./App.scss";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [people, setPeople] = useState(getPeople);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item> מנהל אנשי חוץ </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <PeopleTable people={people} className="people-manager-table" />
      </Content>
      <Footer>Bis Hibur ©2019 Created by Nir Geller</Footer>
    </Layout>
  );
};

export default App;
