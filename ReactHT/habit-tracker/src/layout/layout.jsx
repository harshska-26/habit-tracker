import { Outlet } from "react-router-dom";
import { NavBar } from "../component/navbar/navbar.component";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
