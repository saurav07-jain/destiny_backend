const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    carId: { type: String, required: [true, 'Car is required'] },
    carName: { type: String, required: [true, 'Car name is required'] },
    month: { type: String, required: [true, 'Month is required'] }, // e.g. "2024-04"
    emiExpense: { type: Number, default: 0 },
    garageExpense: { type: Number, default: 0 },
    totalExpense: { type: Number, default: 0 },
  },
  { timestamps: true }
);

expenseSchema.pre('save', function (next) {
  this.totalExpense = (this.emiExpense || 0) + (this.garageExpense || 0);
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);
