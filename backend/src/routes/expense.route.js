import express from 'express'
import { get7daysExpenses, getMonthlyExpenses, addExpense, updateExpense, deleteExpense} from '../controllers/expense.controller.js'
import {expenseValidator} from '../validators/expense.validator.js'
import {protect} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', protect, get7daysExpenses)
router.get('/get', protect, getMonthlyExpenses)
router.post('/add', protect, expenseValidator,addExpense)
router.put('/update/:id', protect, updateExpense)
router.delete('/delete/:id', protect, deleteExpense)

export default router