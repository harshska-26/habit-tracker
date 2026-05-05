import { Outlet } from "react-router-dom";
import { NavBar } from "../component/navbar/navbar.component";
import "./layout.css"

export const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="top-container">
      <Outlet />
      </div>
    </>
  );
};
