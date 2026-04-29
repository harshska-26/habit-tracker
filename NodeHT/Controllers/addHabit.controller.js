const { DefFilePath } = require("../constants/constant");
const { habits } = require("../habits");
const { dataService } = require("../service/dataService");
const { writeJSON } = require("../utils/json.util");

const addHabbitCtrl = (req, res) =>{ 
    const dataRes = dataService();
    const payload=req.body;
    dataRes.habits.push(payload)
    writeJSON(DefFilePath, dataRes);
    res.status(200).json(habits)
}

module.exports={addHabbitCtrl}