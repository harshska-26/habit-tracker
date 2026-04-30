import { motion } from "framer-motion";
import "./home.component.css";
import { useNavigate } from "react-router-dom";
import { TbHealthRecognition } from "react-icons/tb";

export const Home = () => {
  const navigate = useNavigate();

  const habitClick = () => {
    console.log("hiiii");
    navigate("/habits");
  };

  return (
    <>
      <motion.h1
        className="hometext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="homepage-container">
          Welcome to HabiSense,
          <p >One place to track all your activities</p>
          <button onClick={habitClick} id="typ-button">
            <TbHealthRecognition />
            Track your progress here
          </button>
        </div>
      </motion.h1>
    </>
  );
};
