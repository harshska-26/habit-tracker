import { useEffect, useState } from "react";
import { HabitDet } from "../habitDetails/habitDetails.component";
import { habitTrackerData } from "../../service/habitTracker.service";
import "./habit.component.css"

export const Habit = () => {
    const [habit, setHabit] = useState([])

  useEffect(() => {
    const datafunc = async() =>{
      const Data = await habitTrackerData();
      setHabit(Data.habits);
      }
    datafunc();
  },[])
  return(
    <>
    
      <table>
          <thead>
            <tr>
            <th className="main-task-container">Task</th>
              <th>Mon</th>
              <th>Tue</th>  
              <th>Wed</th>  
              <th>Thur</th>  
              <th>Fri</th>  
              <th>Sat</th>  
              <th>Sun</th> 
              <th className="progress-container">Streak</th> 
            </tr>
          </thead>
      </table>
      {habit && habit.map((habit) => {
        return(
          <HabitDet key={habit.id} habit={habit} />
        )
      })}
    </>
  )
}