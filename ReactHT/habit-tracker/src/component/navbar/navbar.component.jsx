import { useNavigate } from "react-router-dom";
import "./navbar.component.css";
export const NavBar = () => {
  const navigate = useNavigate();
  const homeClick = () => {
    navigate("/");
  };
  
  return (
    <>
      <nav>
        <div>
          <img
            onClick={homeClick}
            className="home-logo"
            src="src/assets/logo.jpg"
          ></img>
        </div>
        <div className="nav-center" onClick={homeClick}>
            <img className="logo" src="src/assets/main-logo.png" />
          <h1> HabiSense</h1>
        </div>
      </nav>
    </>
  );
};
