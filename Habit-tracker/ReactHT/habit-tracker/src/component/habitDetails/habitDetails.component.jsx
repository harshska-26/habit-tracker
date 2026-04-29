import { useState } from "react";
import "./habitDetails.component.css";
import { addHabit } from "../../service/habitTracker.service";

export const HabitDet = ({ habit }) => {
  const { id, description, name } = habit;
  const [onestreak, setStreak] = useState(0)
  const [text, setText] = useState(name || "");
  const [desc, setDesc] = useState(description || "");
  const [isEditing, setIsEditing] = useState(!name);
  const [completed, setCompleted] = useState(new Array(7).fill(false));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim() !== "") {
      setIsEditing(false);
      handleSave();
    }
  };

const handleSave = async (e) => {
  if (e?.relatedTarget?.id === "desc-input" || e?.relatedTarget?.id === "taskname-input") return;

  if (!text.trim()) {
    setIsEditing(false);
    return;
  }
  setIsEditing(false);
  try {
    if (!id) {
      const response = await addHabit(text, desc); 
      console.log("Success!", response);
    }
  } catch (err) {
    console.error("Validation failed:", err.response?.data);
  }
};


  console.log(completed)


  const taskOnClick = (index) => {
    const newCompleted = completed.map((val, i) => (i === index ? !val : val));
    setCompleted(newCompleted);
    let count = 0;
    let maxStreak = 0;
    newCompleted.forEach((isDone) => {
      if (isDone) {
        count++;
        if (count > maxStreak) maxStreak = count;
      } else {
        count = 0;
      }
    });
    setStreak(maxStreak);
  };

  return (
        <tr key={id}>
          <td className="input-task-container" onClick={() => setIsEditing(true)}>
            {isEditing ? (
              <div className="edit-fields" >
                <input
                  id="taskname-input"
                  type="text"
                  value={text}
                  placeholder="Habit name..."
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSave}
                />-
                <input
                  id="desc-input"
                  type="text"
                  value={desc}
                  placeholder="Description..."
                  onChange={(e) => setDesc(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSave}
                />
              </div>
            ) : (
              <h3 >
                {text} - {desc}
              </h3>
            )}
          </td>

          {completed.map((isDone, index) => (
            <td key={index}>
              <div
                className={`task-tracker ${isDone ? "bgOne" : ""}`}
                onClick={() => taskOnClick(index)}
              ></div>
            </td>
          ))}

          <td className="progress-container">{onestreak}</td>
        </tr>
  );
};
