import express from 'express'
import { exceptionHandler } from '@util/exceptionHandler'
import { verifyUser } from './validator'
import * as opportunities from './controller'

export const router = express.Router()

router.get('/', verifyUser, exceptionHandler(opportunities.getOpportunities))
