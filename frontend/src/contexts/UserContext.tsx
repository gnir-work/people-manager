import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/login";

interface UserContextInterface {
  username: string;
  is_authenticated: () => boolean;
}

const defaultUserContext = {
  username: undefined,
  is_authenticated: () => false
};

const UserContext = createContext(defaultUserContext);

const UserProvider: React.FC = () => {
  const [username, setUsername] = useState(defaultUserContext.username);

  useEffect(() => {
    getCurrentUser().then(data => {
      setUsername(data.username);
    });
  }, []);

  const login = () => {
    login;
  };

  const isAuthenticated = () => !!username;

  return <UserContext.Provider></UserContext.Provider>;
};
