import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { LOGIN_PAGE_URL } from "../consts";

/**
 * A high order component requiring that the user will be logged in order to view the wrapped component.
 * If the user isn't logged it he will be sent to the login page.
 */
export default function requireLogin<P>(Component: React.ComponentType<P>) {
  const RequiredLoginWrapper: React.FC<P> = props => {
    const { username } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
      console.log("a", username);
      if (!username) {
        console.log("b");
        history.replace(LOGIN_PAGE_URL);
      }
    }, [username, history]);

    return <Component {...props} />;
  };

  RequiredLoginWrapper.displayName = `requireLogin(${Component.displayName ||
    "wrappedComponent"})`;

  return RequiredLoginWrapper;
}
