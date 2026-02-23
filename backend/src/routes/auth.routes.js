import express from 'express'
import {registerValidator,loginValidator} from '../validators/auth.validator.js'

const router = express.Router()

router.post('/register',registerValidator,validate,registerUser)
router.post('/login',loginValidator,validate,loginUser)

export default router