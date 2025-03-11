import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataProvider/DataProvider";

const ProtectedRoute = ({ children, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg: "You need to log in", redirect } });
    }
  }, [user, navigate, redirect]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
