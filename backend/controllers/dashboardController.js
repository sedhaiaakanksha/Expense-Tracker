const Income = require("../models/Income");

const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

//Dashboard
exports.getDashboardData = async (req, res) => {
  console.log("Dashboard controller reached");
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //Fetch total income and expenses

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("Total Income ", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //Get  Income transaction in the last 60 days
    const last60DayIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total income for last 60 days

    const incomeLast60days = last60DayIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    //get expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total expense for last 30 days
    const expenseLast30days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    //Fetch last 5 transaction (income+expense)
    const last5Transaction = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        }),
      ),

      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        }),
      ),
    ].sort((a, b) => b.date - a.date); //sort latest first

    //Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30days,
        transaction: last30DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60days,
        transaction: last60DayIncomeTransactions,
      },

      recentTransactions: last5Transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
