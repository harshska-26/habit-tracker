import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./eachHabit.component.css"

export const EachHabit = () => {
    const location = useLocation();
    const habit = location.state;
    console.log(location)
    const { id, description, name, streak, completed_days, last_week_progress } =
    habit;
    return(
        <motion.div className="each-habit-container" initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}}>
            <div
        className={`eh-accent-bar ${id % 2 === 0 ? "pink" : "blue"}`}
      >
        <h1>{name}<br/>{description}</h1>
      </div>
        </motion.div>
    )
}