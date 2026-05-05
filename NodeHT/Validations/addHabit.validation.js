const { missingFieldFunc } = require("../utils/missingFields.utils");

const addHabbitVal = (req, res, next) => {
  const requiredFields = ["id", "name", "description","streak","completed_days","progress"];
  const MissingFields = missingFieldFunc(requiredFields, req.body);
  if (MissingFields) {
    return res.status(400).json({
      code: "0000",
      message: "Missing required Fields",
      missing: {MissingFields}
    });
  }
  next();
};

module.exports = { addHabbitVal };