import React from "react";
import { Layout, Menu } from "antd";
import { PeopleContextProvider } from "./contexts/PeopleContext";
import PeopleTable from "./components/PeopleTable/PeopleTable";

import "antd/dist/antd.css";
import "./rtl.scss";
import "./App.scss";
import AddPersonModal from "./components/PeopleTable/AddPersonModal";
import { PeopleSettingsContextProvider } from "./contexts/PeopleSettingsContext";

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
        <PeopleContextProvider>
          <PeopleSettingsContextProvider>
            <PeopleTable className="people-manager-table" />
            <AddPersonModal />
          </PeopleSettingsContextProvider>
        </PeopleContextProvider>
      </Content>
      <Footer>Bis Hibur ©2019 Created by Nir Geller</Footer>
    </Layout>
  );
};

export default App;
