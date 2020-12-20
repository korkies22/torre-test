import express from 'express'
export const router = express.Router()

import { router as authRoutes } from './modules/auth/routes'
import { router as membersRoutes } from './modules/members/routes'
import { router as groupsRoutes } from './modules/groups/routes'

router.use('/auth', authRoutes)
router.use('/members', membersRoutes)
router.use('/groups', groupsRoutes)
