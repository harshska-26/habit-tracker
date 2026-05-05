import { useEffect, useState } from "react";
import { HabitDet } from "../habitDetails/habitDetails.component";
import "./habit.component.css";
import { AnimatePresence, motion } from "framer-motion";
import { habitTrackerData } from "../../service/habitTracker.service";
import axios from "axios";

export const Habit = () => {
  const [allHabits, setAllHabits] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextWeek = async () => {
    const confirmReset = window.confirm(
      "Start a new week? This clears current progress.",
    );
    if (confirmReset) {
      try {
        await axios.put("http://localhost:4000/nextWeek");
        const data = await habitTrackerData();
        if (data && data.habits) {
          setAllHabits(data.habits);
        }
        setCurrentSlide((prev) => prev + 1);
      } catch (error) {
        alert(`error resetting week ${error}`);
      }
    }
  };

  useEffect(() => {
    const dataFunc = async () => {
      const data = await habitTrackerData();
      if (data && data.habits) {
        setAllHabits(data.habits);
      }
    };
    dataFunc();
  }, []);

  const addNewHabitRow = () => {
    const maxId =
      allHabits.length > 0
        ? Math.max(...allHabits.map((h) => Number(h.id)))
        : 0;
    const newBlankHabit = {
      id: maxId + 1,
      name: "",
      description: "",
      streak: 0,
      completed_days: [],
      progress: 0,
      last_week_progress: 0,
    };
    setAllHabits([...allHabits, newBlankHabit]);
  };

  const handleDeleteUI = (idToDelete) => {
    setAllHabits(allHabits.filter((habit) => habit.id !== idToDelete));
  };

  //   console.log("Current habits in state:", allHabits);

  return (
    <motion.div
      className="habit-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="add-habit-header">
        <button className="add-btn-pill" onClick={addNewHabitRow}>
          <span>+</span> Start a habit
        </button>
        <button
          className="add-btn-pill"
          onClick={handleNextWeek}
          style={{ marginLeft: "10px" }}
        >
          Next Week ➔
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="habit-grid"
        >
          {allHabits.map((h, index) => (
            <HabitDet
              key={h.id}
              indexid={index + 1}
              habit={h}
              onDelete={handleDeleteUI}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
