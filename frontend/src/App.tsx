import React from "react";
import { Layout } from "antd";
import PeoplePage from "./PeoplePage/PeoplePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";
import "./rtl.scss";
import "./App.scss";
import AppHeader from "./AppHeader";
import {
  APPOINTMENT_PAGE_URL,
  PEOPLE_PAGE_URL,
  LOGIN_PAGE_URL
} from "./consts";
import AppointmentPage from "./AppointmentPage/AppointmentPage";
import { SiteSettingsContextProvider } from "./contexts/SiteSettingsContext";
import { PeopleContextProvider } from "./contexts/PeopleContext";
import { AppointmentContextProvider } from "./contexts/AppointmentContext";
import LoginPage from "./LoginPage/LoginPage";
import UserContextProvider from "./contexts/UserContext";
import AppLoader from "./components/AppLoader";

const { Content, Footer } = Layout;

const App: React.FC = () => (
  <UserContextProvider>
    <AppLoader>
      <Router>
        <Switch>
          <Route exact path={LOGIN_PAGE_URL}>
            <LoginPage />
          </Route>
          <Layout className="layout">
            <SiteSettingsContextProvider>
              <AppHeader />
              <Content>
                <PeopleContextProvider>
                  <AppointmentContextProvider>
                    <Route exact path={APPOINTMENT_PAGE_URL}>
                      <AppointmentPage />
                    </Route>
                    <Route exact path={PEOPLE_PAGE_URL}>
                      <PeoplePage />
                    </Route>
                  </AppointmentContextProvider>
                </PeopleContextProvider>
              </Content>
              <Footer>Bis Hibur ©2019 Created by Nir Geller</Footer>
            </SiteSettingsContextProvider>
          </Layout>
        </Switch>
      </Router>
    </AppLoader>
  </UserContextProvider>
);

export default App;
