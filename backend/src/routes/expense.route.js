import express from 'express'
import { getWeeklyExpenses, getMonthlyExpenses, addExpense, updateExpense, deleteExpense} from '../controllers/expense.controller.js'
import expenseValidator from '../validators/expense.validator.js'

const router = express.Router()

router.post('/', protect, getWeeklyExpenses)
router.post('/get', protect, getMonthlyExpenses)
router.post('/add', protect, expenseValidator,addExpense)
router.put('/update/:id', protect, updateExpense)
router.delete('/delete/:id', protect, deleteExpense)

export default router