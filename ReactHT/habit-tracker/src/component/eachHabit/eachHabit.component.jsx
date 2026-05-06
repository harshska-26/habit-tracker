import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./eachHabit.component.css";
import { useEffect, useState } from "react";
import { habitTrackerData } from "../../service/habitTracker.service";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const EachHabit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [indexArr, setIndexArr] = useState([]);
  const [filteredid, setFilteredid] = useState("");
  const habitid = location.state;
  const [indexValue, setIndexValue] = useState(habitid);
  const {
    id,
    description,
    name,
    streak,
    completed_days,
    progress,
    last_week_progress,
  } = filteredid;

  useEffect(() => {
    const dataService = async () => {
      const data = await habitTrackerData();
      setIndexArr(data.habits);
      const filteredHabit = data.habits.filter((h) => {
        if (h.id === indexValue) {
          return h;
        }
      });
      setFilteredid(filteredHabit[0]);
    };
    dataService();
  }, [indexValue]);

  const handleNextHabit = () => {
    if (indexValue < indexArr.length) {
      setIndexValue((prev) => prev + 1);
    }
  };
  
  const handlePrevHabit = () => {
    if (indexValue > 1) {
      setIndexValue((prev) => prev - 1);
    }
  };

  console.log(indexValue);

  return (
    <>
      <div className="eh-add-habit-header">
        <button className="eh-nav-pill" onClick={handlePrevHabit}>
          <span>⬅ Prev Habit</span>
        </button>
        <button className="eh-nav-pill" onClick={() => navigate(-1)}>
          Home
        </button>
        <button
          className="eh-nav-pill"
          style={{ marginLeft: "10px" }}
          onClick={handleNextHabit}
        >
          Next Habit ➡
        </button>
      </div>
      {/* <AnimatePresence mode="wait"> */}
        <motion.div
          key={indexValue}
          initial={{x: 0, opacity: 0 }}
          exit={{ x: -300, opacity: 0 }}
              animate={{x:0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {filteredid !== "" && (
            <motion.div
              className="each-habit-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ width: 1000 }}
                animate={{ width: 1450 }}
                transition={{ duration: 1 }}
                className={`eh-accent-bar ${id % 2 === 0 ? "pink" : "blue"}`}
              >
                <div className="name-desc-container">
                  <h1>{name}</h1>
                  <b>---------------------------------------------</b>
                  <h1>{description}</h1>
                </div>
                <div className="eh-flame-badge">
                  <span>🔥</span>
                  <span className="eh-streak-count">{streak}</span>
                </div>
              </motion.div>
              <div className="eh-progress-track">
                <h1>
                  Your progress this week{" "}
                  <CircularProgressbar
                    className="eh-progress-circle"
                    value={progress}
                    text={`${progress}%`}
                  />
                </h1>
                <h1>
                  Previous Week Progress{" "}
                  <CircularProgressbar
                    className="eh-progress-circle"
                    value={last_week_progress}
                    text={`${last_week_progress}%`}
                  />
                </h1>
              </div>
              <div className="eh-days-row">
                {days.map((day, i) => (
                  <div key={i} className="eh-day-column">
                    <h2>{day}</h2>
                    <motion.div
                      initial={{ width: 50 }}
                      animate={{ width: 150 }}
                      transition={{ duration: 2 }}
                      className={`eh-check-box ${completed_days[i] ? "checked" : ""}`}
                    >
                      {completed_days[i] && "✓"}
                    </motion.div>
                  </div>
                ))}
              </div>
              <div>
                <h1>🏆 Longest Streak : {streak}</h1>
              </div>
            </motion.div>
          )}
        </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
};
