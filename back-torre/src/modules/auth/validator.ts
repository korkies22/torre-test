import { body, ValidationChain, validationResult } from 'express-validator'
import { Middleware } from 'express-validator/src/base'
export const validate = (
  method: 'login'
): Array<ValidationChain | Middleware> => {
  switch (method) {
    case 'login': {
      return [
        body('username', 'You have to enter a valid username').exists(),
        body('password', 'You have to enter a valid password')
          .exists()
          .isLength({ min: 6 })
          .withMessage('Password should have at least 6 characters'),
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
