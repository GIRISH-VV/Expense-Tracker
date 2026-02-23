import express from 'express'
import { updateUser} from '../controllers/user.controller.js'
import {protect} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.put('/updateProfile', protect, updateUser)

export default router