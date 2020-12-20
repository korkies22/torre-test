import { tokenVerifier } from '@util/credentialsUtils'
import express from 'express'
import { body, ValidationChain, validationResult } from 'express-validator'
import { Middleware } from 'express-validator/src/base'
export const validate = (
  method: 'create'
): Array<ValidationChain | Middleware> => {
  switch (method) {
    case 'create': {
      return [
        body('name', 'You must enter a valid name')
          .exists()
          .isLength({ min: 4 })
          .withMessage('username should have at least 4 characters'),
        body('members.*', 'You must enter a valid member array')
          .exists()
          .isString()
          .withMessage('Members should be an array of strings'),
      ]
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
