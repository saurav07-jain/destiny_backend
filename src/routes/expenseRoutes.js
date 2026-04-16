const express = require('express');
const { getExpenses, getExpense, createExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');

const router = express.Router();

router.route('/').get(getExpenses).post(createExpense);
router.route('/:id').get(getExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;
