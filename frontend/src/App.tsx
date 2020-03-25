import React from "react";
import { Layout } from "antd";
import PeoplePage from "./PeoplePage/PeoplePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";
import "./rtl.scss";
import "./App.scss";
import AppHeader from "./AppHeader";
import { APPOINTMENT_PAGE_URL, PEOPLE_PAGE_URL } from "./consts";

const { Content, Footer } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout className="layout">
      <AppHeader />
      <Content>
        <Switch>
          <Route exact path={APPOINTMENT_PAGE_URL}>
            <h1> To be implemented </h1>
          </Route>
          <Route path={PEOPLE_PAGE_URL}>
            <PeoplePage />
          </Route>
        </Switch>
      </Content>
      <Footer>Bis Hibur ©2019 Created by Nir Geller</Footer>
    </Layout>
  </Router>
);

export default App;
