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
            id: 0,
            name: "",
            description: "",
            streak: 0
        };
        setAllHabits([...allHabits, newBlankHabit ]); 
    };

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
            </div>

            {/* Grid for the cards */}
            <div className="habit-grid">
                {allHabits.map((h, index) => (
                    <HabitDet 
                        key={h.id}
                        indexid={index} 
                        habit={h} 
                    />
                ))}
            </div>
        </motion.div>
    );
};
