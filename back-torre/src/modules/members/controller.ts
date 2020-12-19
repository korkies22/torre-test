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
    const response = await fetch(`https://bio.torre.co/api/bios/${username}`, {
      method: 'GET',
    })
    if (!response.ok) {
      res.send(null)
    }
    res.send((await response.json()).person)
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
