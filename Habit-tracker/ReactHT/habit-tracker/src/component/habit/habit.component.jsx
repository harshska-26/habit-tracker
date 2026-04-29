import { useEffect, useState } from "react";
import { HabitDet } from "../habitDetails/habitDetails.component";
import "./habit.component.css"
import { motion } from "framer-motion";
import { habitTrackerData } from "../../service/habitTracker.service";



export const Habit = () => {
    const [allHabits, setAllHabits] = useState([]);

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
        const newBlankHabit = {
            name: "",
            description: "",
            streak: 0
        };
        setAllHabits([...allHabits, newBlankHabit]);
    };

    return (
        <motion.div className="table-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <table>
                <thead>
                    <tr>
                        <th className="main-task-container">Task</th>
                        <th>Mon</th><th>Tue</th><th>Wed</th><th>Thur</th><th>Fri</th><th>Sat</th><th>Sun</th>
                        <th className="progress-container">Streak</th>
                    </tr>
                </thead>
                <tbody>
                     {allHabits.map((h, index) => (
                        <HabitDet 
                            key={h.id || index} 
                            habit={h} 
                        />
                    ))}
                </tbody>
            </table>
            <div className="add-habit-btn-container">
                <button className="add-btn" onClick={addNewHabitRow}>
                    + Add New Habit
                </button>
            </div>
        </motion.div>
    );
};
