const client = require("../database");

const addHabbitCtrl = async (req, res) => {
    try {
        const { name, description } = req.body;
        const query = `
            INSERT INTO habits (name, description) 
            VALUES ($1, $2) 
            RETURNING *;
        `;
        const result = await client.query(query, [name, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addHabbitCtrl };
