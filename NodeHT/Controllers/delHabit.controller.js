const client = require("../database");

const delHabitCtrl = async (req, res) => {
  try {
    const { id } = req.body; 
    const query = `DELETE FROM habits WHERE id = $1 RETURNING *;`;
    const result = await client.query(query, [id]);
    res.status(200).json({ message: "Deleted successfully", deletedHabit: result.rows[0]});
    console.log("DELETED ID:", id);
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { delHabitCtrl };