import express from 'express'
export const router = express.Router()

import { router as authRoutes } from './modules/auth/routes'

router.use('/auth', authRoutes)
