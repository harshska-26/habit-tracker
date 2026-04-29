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
const { delHabitVal } = require("./Validations/delHabit.controller");

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.status(200).json(habits);
});
app.post("/addHabit", addHabbitVal, addHabbitCtrl);
app.delete("/delHabit", delHabitVal, delHabitCtrl);

app.post('/api/data', (req, res) => {
    console.log(req.body); // Access the data sent from React
    res.json({ message: "Data received successfully!" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
