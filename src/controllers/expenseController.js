const Expense = require('../models/Expense');

const getExpenses = async (req, res, next) => {
  try {
    const { carId, month, search } = req.query;
    const filter = {};
    if (carId) filter.carId = carId;
    if (month) filter.month = month;
    if (search) {
      filter.$or = [
        { carName: { $regex: search, $options: 'i' } },
        { month: { $regex: search, $options: 'i' } },
      ];
    }
    const expenses = await Expense.find(filter).sort({ createdAt: -1 });
    res.json({ expenses });
  } catch (err) {
    next(err);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ expense });
  } catch (err) {
    next(err);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.totalExpense = (Number(data.emiExpense) || 0) + (Number(data.garageExpense) || 0);
    const expense = await Expense.create(data);
    res.status(201).json({ expense });
  } catch (err) {
    next(err);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    Object.assign(expense, req.body);
    expense.totalExpense = (expense.emiExpense || 0) + (expense.garageExpense || 0);
    await expense.save();
    res.json({ expense });
  } catch (err) {
    next(err);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getExpenses, getExpense, createExpense, updateExpense, deleteExpense };
