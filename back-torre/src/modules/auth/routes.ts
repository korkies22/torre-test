import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { validate } from './validator'
import * as auth from './controller'

export const router = express.Router()

router.post('/', validate('login'), exceptionHandler(auth.login))
