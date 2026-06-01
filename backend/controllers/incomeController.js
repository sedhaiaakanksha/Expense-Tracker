const User = require("../models/User");

const Income = require("../models/Income");

//Add Income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    //Validation: check for missing field

    if (!source || !amount || !date) {
      return res.status(400).json({ message: " All fiels are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//Get all Income source
exports.getAllIncome = async (req, res) => {};

//Delete Income source
exports.deleteIncome = async (req, res) => {};

// Download income in excel
exports.downloadIncomeExcel = async (req, res) => {};
