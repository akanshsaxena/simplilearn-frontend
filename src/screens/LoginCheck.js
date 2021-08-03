import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard";
import Auth from "../screens/Auth";

export default function LoginCheck() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log("isloggedin", isLoggedIn);
  return <>{isLoggedIn ? <Dashboard /> : <Auth />}</>;
}
