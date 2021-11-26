import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LANDING_ROUTE } from "../../utils/consts";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={LANDING_ROUTE} />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
