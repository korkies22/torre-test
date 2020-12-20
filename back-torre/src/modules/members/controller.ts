import { checkMember } from '@util/torre'
import express from 'express'
export const router = express.Router()
import { validationErrorHandler } from './validator'

/**
 * Refresh an user token given the refreshToken
 * @param req.body.username username from the user
 * @param req.body.refreshToken refresh token used for verifying the user
 */
export const checkUserTorre = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const username = req.query.user
    const person = await checkMember(username)

    res.send(person)
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while fetching this user. Please try again later',
      }
    } else {
      throw e
    }
  }
}
