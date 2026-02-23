import Expense from "../models/expense.model.js";

export const get7daysExpenses = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);
    pastDate.setHours(0, 0, 0, 0);

    const expenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: pastDate,
        $lte: today,
      },
    }).sort({ date: -1 });

    return res.status(200).json({ success: true, filterDays: days, count: expenses.length, data: expenses});

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  try {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    if (!month || !year)
      return res.status(400).json({ success: false, message: "Month and Year are required" });

    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return res.status(200).json({ success: true, month, year, total: totalAmount, count: expenses.length, data: expenses });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { amount, date, description } = req.body;

    const expense = await Expense.create({
      amount,
      date,
      description,
      user: req.user.id, 
    });

    res.status(201).json({ success: true, message: "Expense added successfully", data: expense});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user.id }, 
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense)
      return res.status(404).json({ success: false, message: "Expense not found" });

    return res.status(200).json({ success: true, message: "Expense updated successfully", data: expense });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found", });
    }

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};