const client = require("../database");

const addHabbitCtrl = async (req, res) => {
  try {
    const { id, name, description, completed_days, streak, progress, last_week_progress } = req.body;
    const query = `
    INSERT INTO habits (id, name, description, streak, completed_days, progress, last_week_progress) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) 
    DO UPDATE SET 
        name = EXCLUDED.name, 
        description = EXCLUDED.description,
        completed_days = EXCLUDED.completed_days,
        streak = EXCLUDED.streak,
        progress = EXCLUDED.progress,
        last_week_progress = EXCLUDED.last_week_progress
    RETURNING *;
`;
    const result = await client.query(query, [id, name, description, streak, completed_days, progress,  last_week_progress]);
    res.status(201).json(result.rows[0]);
    console.log("ADDED")
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addHabbitCtrl };