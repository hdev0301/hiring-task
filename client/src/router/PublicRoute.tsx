import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const PublicRoute: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.users);

  return currentUser?.token ? <Navigate to="/todos" replace /> : <Outlet />;
};

export default PublicRoute;
