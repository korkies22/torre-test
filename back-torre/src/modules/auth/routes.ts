import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { validate } from './validator'
import * as auth from './controller'

export const router = express.Router()

router.post(
  '/refreshToken',
  validate('refresh'),
  exceptionHandler(auth.refreshToken)
)
router.post('/create', validate('login'), exceptionHandler(auth.createUser))

router.post('/', validate('login'), exceptionHandler(auth.login))
