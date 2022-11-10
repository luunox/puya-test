/** @format */

import { NavBar } from "#components";
import "#styles/app.css";
import "antd/dist/antd.dark.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <NavBar />
      <div id="container">
        {pathname === "/" && <button onClick={() => navigate(`/login`)}>Login</button>}
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
