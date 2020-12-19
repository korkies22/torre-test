import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { validate, verifyUser } from './validator'
import * as auth from './controller'

export const router = express.Router()

router.get(
  '/checkTorre',
  validate('check'),
  verifyUser,
  exceptionHandler(auth.checkUserTorre)
)
