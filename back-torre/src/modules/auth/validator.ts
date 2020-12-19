import { body, ValidationChain, validationResult } from 'express-validator'
import { Middleware } from 'express-validator/src/base'
export const validate = (
  method: 'login' | 'refresh'
): Array<ValidationChain | Middleware> => {
  switch (method) {
    case 'login': {
      return [
        body('username', 'You must enter a valid username')
          .exists()
          .isLength({ min: 4 })
          .withMessage('username should have at least 4 characters'),
        body('password', 'You must enter a valid password')
          .exists()
          .isLength({ min: 6 })
          .withMessage('Password should have at least 6 characters'),
      ]
    }
    case 'refresh': {
      return [
        body('username', 'You must enter a valid username')
          .exists()
          .isLength({ min: 4 })
          .withMessage('username should have at least 4 characters'),
        body('refreshToken', 'You must enter a valid refreshToken').exists(),
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
