import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../common/constant";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace="true"
        state={{ path: location.pathname }}
      />
    );
  }

  return children;
};

export default RequireAuth;
