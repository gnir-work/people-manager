import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import {
  LOCATION_TO_ITEM,
  APPOINTMENT_PAGE_URL,
  PEOPLE_PAGE_URL
} from "./consts";
import SettingsEditorModal from "./components/modals/SettingsEditorModal";

import "./AppHeader.scss";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const location = useLocation();
  const selectedKey = LOCATION_TO_ITEM[location.pathname];

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key={LOCATION_TO_ITEM[APPOINTMENT_PAGE_URL]}>
          <FontAwesomeIcon icon={faCalendarCheck} />{" "}
          <Link to={APPOINTMENT_PAGE_URL}>זימונים</Link>
        </Menu.Item>
        <Menu.Item key={LOCATION_TO_ITEM[PEOPLE_PAGE_URL]}>
          <FontAwesomeIcon icon={faUsers} />{" "}
          <Link to={PEOPLE_PAGE_URL}>אנשים</Link>
        </Menu.Item>
        <SettingsEditorModal className="settings-menu-item" />
      </Menu>
    </Header>
  );
};

export default AppHeader;
