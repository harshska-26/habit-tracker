const { DefFilePath } = require("../constants/constant");
const { habits } = require("../habits");
const { dataService } = require("../service/dataService");
const { writeJSON } = require("../utils/json.util");

const delHabitCtrl = (req, res, next) => {
    const dataRes = dataService();
    const {id} = req.body;
    console.log(id)
    const newData = dataRes.habits.filter((eachHabit) => eachHabit.id !== id);
    dataRes.habits = newData;
    writeJSON(dataRes, DefFilePath)
    res.status(200).json(dataRes)
}

module.exports={delHabitCtrl}