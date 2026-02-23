import express from 'express'
import {registerValidator,loginValidator} from '../validators/auth.validator.js'
import {validate} from '../middlewares/validate.js'
import { registerUser, loginUser} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register',registerValidator,validate,registerUser)
router.post('/login',loginValidator,validate,loginUser)

export default router