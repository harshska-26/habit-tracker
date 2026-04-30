import { useState } from "react";
import "./habitDetails.component.css";
import { addHabit } from "../../service/habitTracker.service";

export const HabitDet = ({ habit, indexid }) => {
  const { description, name } = habit;
  const [onestreak, setStreak] = useState(0);
  const [text, setText] = useState(name || "");
  const [desc, setDesc] = useState(description || "");
  const [isEditing, setIsEditing] = useState(!name);
  const [completed, setCompleted] = useState(new Array(7).fill(false));
  const [isOpen, setIsOpen] = useState(false);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim() !== "") {
      setIsEditing(false);
      handleSave();
    }
  };

  const handleSave = async (e) => {
    console.log("Saving with ID:", indexid);

    if (
      e?.relatedTarget?.id === "desc-input" ||
      e?.relatedTarget?.id === "taskname-input"
    )
      return;
    if (!text.trim()) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);

    try {
      const response = await addHabit(indexid, text, desc);
      console.log("Success!", response);
    } catch (err) {
      console.error("Validation failed:", err.response?.data);
    }
  };

  const taskOnClick = (index) => {
    const newCompleted = completed.map((val, i) => (i === index ? !val : val));
    setCompleted(newCompleted);

    let maxStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < newCompleted.length; i++) {
      if (newCompleted[i] === true) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }
    setStreak(maxStreak);
  };

  return (
    <div className="habit-card" key={indexid}>
      {/* Top Accent Bar */}
      <div
        className={`accent-bar ${indexid % 2 === 0 ? "pink" : "blue"}`}
      ></div>

      <div className="habit-header">
        <div className="text-section" onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <div className="edit-fields">
              <input
                id="taskname-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <input
                id="desc-input"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <>
              <h3>{text}</h3>
              <p>{desc}</p>
            </>
          )}
        </div>
        <div className="flame-badge">
          <span>🔥</span>
          <span className="streak-count">{onestreak}</span>
        </div>
      </div>

      <div className="habit-stats">
        <div className="progress-circle">
          <div className="circle-inner">37%</div>
        </div>
      </div>
      <div className="status-grid">
        <p>This Week</p>
        <div className="days-row">
          {days.map((day, i) => {
            return (
              <div key={i} className="day-column">
                <span>{day}</span>
                <div
                  className={`check-box ${completed[i] ? "checked" : ""}`}
                  onClick={() => taskOnClick(i)}
                >
                  {completed[i] && "✓"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="habit-footer">
        <div className="stat-row">
          <span>🔥 Longest Streak</span>
          <strong>
            {onestreak === 1 ? `${onestreak} day` : `${onestreak}days`}
          </strong>
        </div>
        <button className="view-details" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖ Close Details" : "👁 View Details"}
        </button>
      </div>
    </div>
  );
};
