import React, { createContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  login as loginAPI,
  logout as logoutAPI
} from "../api/login";
import LoginData from "../types/login";

interface UserContextInterface {
  username: string;
  loading: boolean;
  isAuthenticated: () => boolean;
  login: (values: LoginData) => void;
  logout: () => void;
}

const defaultUserContext: UserContextInterface = {
  username: "",
  loading: true,
  isAuthenticated: () => false,
  login: (values: LoginData) => {},
  logout: () => {}
};

export const UserContext = createContext(defaultUserContext);

const UserContextProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState(defaultUserContext.username);
  const [loading, setLoading] = useState(defaultUserContext.loading);

  useEffect(() => {
    getCurrentUser().then(data => {
      setUsername(data.currentUser);
      setLoading(false);
    });
  }, []);

  const login = (values: LoginData) => {
    loginAPI(values).then(({ username }) => {
      setUsername(username);
    });
  };

  const logout = () => {
    logoutAPI().then(() => {
      setUsername("");
    });
  };

  const isAuthenticated = () => !!username;

  return (
    <UserContext.Provider
      value={{
        username,
        isAuthenticated,
        login,
        logout,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
