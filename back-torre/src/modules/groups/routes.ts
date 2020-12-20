import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { validate, verifyUser } from './validator'
import * as groups from './controller'
import { upload } from '@util/cloudinary'

export const router = express.Router()

router.post(
  '/',
  verifyUser,
  upload.single('file'),
  validate('create'),
  exceptionHandler(groups.createGroup)
)

router.get('/:id', verifyUser, exceptionHandler(groups.getGroupById))

router.get('/', verifyUser, exceptionHandler(groups.getGroups))
