const { DefFilePath } = require("./constants/constant");
const { readJSON } = require("./utils/json.util");

const habits = readJSON(DefFilePath)

module.exports={habits}