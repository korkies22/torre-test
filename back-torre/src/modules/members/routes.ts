import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { validate, verifyUser } from './validator'
import * as members from './controller'

export const router = express.Router()

router.get(
  '/checkTorre',
  validate('check'),
  verifyUser,
  exceptionHandler(members.checkUserTorre)
)
