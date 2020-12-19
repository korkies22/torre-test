import { tokenVerifier } from '@util/credentialsUtils'
import express from 'express'
import { query, ValidationChain, validationResult } from 'express-validator'
import { Middleware } from 'express-validator/src/base'
export const validate = (
  method: 'check'
): Array<ValidationChain | Middleware> => {
  switch (method) {
    case 'check': {
      return [query('user', 'You must enter a valid user to be found').exists()]
    }
  }
}

export const validationErrorHandler = (req): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw {
      message: 'Validation error',
      statusCode: '400',
      data: errors.array(),
    }
  }
}

export const verifyUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    req.user = await tokenVerifier(req)
  } catch (err) {
    res.status(401).send({ message: 'Invalid Token' })
    return
  }
  next()
}
