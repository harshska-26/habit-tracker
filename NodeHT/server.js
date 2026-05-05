const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { habits } = require("./habits");
const { addHabbitVal } = require("./Validations/addHabit.validation");
const { addHabbitCtrl } = require("./Controllers/addHabit.controller");
const {
  delCharCtrl,
  delHabitCtrl,
} = require("./Controllers/delHabit.controller");
const { delHabitVal } = require("./Validations/delHabit.validation");
const client = require("./database");

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM habits ORDER BY id ASC");
    res.status(200).json({ habits: result.rows });
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/workPoint", (req, res) => {
  return res.status(200).json("succesfully running")
})

app.post("/addHabit", addHabbitVal, addHabbitCtrl);

app.delete("/delHabit", delHabitVal, delHabitCtrl);

app.put("/nextWeek", async (req, res) => {
  try {
    const query = `
      UPDATE habits 
      SET completed_days = '[]'::jsonb, 
          progress = 0;
    `;
    await client.query(query);
    res.status(200).json({ message: "Started new week" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset for next week" });
  }
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
