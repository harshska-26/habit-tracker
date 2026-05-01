const { habits } = require("../habits");

const delHabitVal = (req, res, next) => {
    console.log("Body received in validator:", req.body); 
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      code: "0000",
      message: "Required fields Missing",
    });
  }
  next();
};

module.exports = { delHabitVal };
