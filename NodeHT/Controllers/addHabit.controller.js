const client = require("../database");

const addHabbitCtrl = async (req, res) => {
  try {
    const { id, name, description, completed_days, streak, progress } = req.body;

    const query = `
    INSERT INTO habits (id, name, description, streak, completed_days, progress) 
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (id) 
    DO UPDATE SET 
        name = EXCLUDED.name, 
        description = EXCLUDED.description,  -- <--- Added this comma
        completed_days = EXCLUDED.completed_days,
        streak = EXCLUDED.streak,
        progress = EXCLUDED.progress
    RETURNING *;
`;

    const result = await client.query(query, [id, name, description, streak, completed_days, progress]);
    res.status(201).json(result.rows[0]);
    console.log("ADDED");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addHabbitCtrl };
