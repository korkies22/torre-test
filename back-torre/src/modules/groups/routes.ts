import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { validate, verifyUser } from './validator'
import * as auth from './controller'
import { upload } from '@util/cloudinary'

export const router = express.Router()

router.post(
  '/',
  upload.single('file'),
  validate('create'),
  exceptionHandler(auth.createGroup)
)

router.get('/:id', verifyUser, exceptionHandler(auth.getGroupById))

router.get('/', verifyUser, exceptionHandler(auth.getGroups))
