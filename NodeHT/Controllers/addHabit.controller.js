const client = require("../database");

const addHabbitCtrl = async (req, res) => {
  try {
    const { id, name, description } = req.body;

    const query = `
            INSERT INTO habits (id, name, description) 
            VALUES ($1, $2, $3)
            ON CONFLICT (id) 
            DO UPDATE SET 
                name = EXCLUDED.name, 
                description = EXCLUDED.description
            RETURNING *;
        `;
    const result = await client.query(query, [id, name, description]);
    res.status(201).json(result.rows[0]);
    console.log("ADDED");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addHabbitCtrl };
