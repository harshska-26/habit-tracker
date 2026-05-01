import { useNavigate } from "react-router-dom";
import "./navbar.component.css";
import axios from "axios";
export const NavBar = () => {
  const navigate = useNavigate();
  const homeClick = () => {
    navigate("/");
  };

  const handleNextWeek = async () => {
        const confirmReset = window.confirm("Start a new week? This clears current progress.");
        if (confirmReset) {
            try {
                await axios.put("http://localhost:4000/nextWeek");
                window.location.reload(); 
            } catch(error) {
                alert(`error resetting week ${error}`);
            }
        }
    };
  
  return (
    <>
      <nav>
        <div>
          <img
            onClick={homeClick}
            className="logo"
            src="src/assets/logo.jpg"
          ></img>
        </div>
        <div className="nav-center" onClick={homeClick}>
            <img className="logo" src="src/assets/main-logo.png" />
          <h1> HabiSense</h1>
        </div>
        <div>
          <button onClick={handleNextWeek}  id="next-week-nav-btn">Next Week →</button>
        </div>
      </nav>
    </>
  );
};
