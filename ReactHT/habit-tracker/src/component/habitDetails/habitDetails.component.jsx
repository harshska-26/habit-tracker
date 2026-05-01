import { useState } from 'react';
import './habitDetails.component.css';
import { addHabit, deleteHabit } from '../../service/habitTracker.service';

export const HabitDet = ({ habit, indexid, onDelete }) => {
  const { description, name, streak, completed_days } = habit;

  const [onestreak, setStreak] = useState(streak || 0);
  const [text, setText] = useState(name || "");
  const [desc, setDesc] = useState(description || "");
  const [completed, setCompleted] = useState(
  completed_days && completed_days.length === 7 
    ? completed_days 
    : new Array(7).fill(false)
);
  const [isEditing, setIsEditing] = useState(!name);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const progress = Math.round((completed.filter((val) => val === true).length / 7) * 100);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim() !== "") {
      setIsEditing(false);
      handleSave();
    }
  };

  console.log(`Task ${indexid} state:`, completed);


  const handleSave = async (e) => {
    if (e?.relatedTarget?.id === "desc-input" || e?.relatedTarget?.id === "taskname-input") return;
    if (!text.trim()) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    try {
      await addHabit(indexid, text, desc, completed, onestreak, progress);
    } catch (err) {
      console.error("Validation failed:", err.response?.data);
    }
  };

  const taskOnClick = async (index) => {
    const newCompleted = completed.map((val, i) => (i === index ? !val : val));
    setCompleted(newCompleted);

    let currentS = 0;
    let maxS = 0;

    for (let i = 0; i < newCompleted.length; i++) {
      if (newCompleted[i] === true) {
        currentS++;
        if (currentS > maxS) maxS = currentS;
      } else {
        currentS = 0;
      }
    }
    setStreak(maxS);

    const newProgress = Math.round((newCompleted.filter((val) => val === true).length / 7) * 100);

    try {
      await addHabit(indexid, text, desc, newCompleted, maxS, newProgress);
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      try {
        console.log("Deleting habit with ID:", habit.id);
        await deleteHabit(habit.id);
        onDelete(habit.id);
      } catch (err) {
        console.error("Delete failed:", err.response?.data);
      }
    }
  };

  return (
    <div className="habit-card" key={indexid}>
      <div className={`accent-bar ${indexid % 2 === 0 ? 'pink' : 'blue'}`}></div>

      <div className="habit-header">
        <div className="text-section" onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <div className="edit-fields">
              <input id="taskname-input" type="text" value={text} onChange={(e) => setText(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown} autoFocus />
              <input id="desc-input" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown} />
            </div>
          ) : (
            <>
              <h3>{text}</h3>
              -----------------
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
          <div className="circle-inner">Progress : {progress}%</div>
        </div>
        <button className="delete-btn" onClick={handleDelete}>🗑️</button>
      </div>

      <div className="status-grid">
        <p>This Week</p>
        <div className="days-row">
          {days.map((day, i) => (
            <div key={i} className="day-column">
              <span>{day}</span>
              <div className={`check-box ${completed[i] ? 'checked' : ''}`} onClick={() => taskOnClick(i)}>
                {completed[i] && "✓"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="habit-footer">
        <div className="stat-row">
          <span>🔥 Longest Streak</span>
          <strong>{onestreak} {onestreak === 1 ? 'day' : 'days'}</strong>
          </div>
          </div>
    </div>
  );
};



  // const [isOpen, setIsOpen] = useState(false);
        {/* </div>
        <button className="view-details" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖ Close Details" : "👁 View Details"}
        </button>
      </div> */}