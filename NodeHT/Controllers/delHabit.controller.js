const client = require("../database")

const delHabitCtrl = async (req, res) => {
    try {
        const { id } = req.body;
        const query = `
            INSERT INTO habits (name, description) 
            VALUES ($1, $2) 
            RETURNING *;
        `;
        const result = await client.query(query, [id]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { delHabitCtrl };
