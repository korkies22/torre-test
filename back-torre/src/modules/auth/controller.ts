import {
  checkPassword,
  createRefreshToken,
  createToken,
  hashPassword,
} from '@util/credentialsUtils'
import express from 'express'
export const router = express.Router()
import * as queries from './queries'
import { validationErrorHandler } from './validator'

/**
 * Login user
 * @param req.body.username username from user
 * @param req.body.password password from user
 */
export const login = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const username = req.body.username
    const password = req.body.password
    const user = await queries.findUser(username)
    if (!user) {
      throw { message: 'Wrong username or password', statusCode: 403 }
    }
    const isEqual = await checkPassword(password, user.password)
    if (!isEqual) {
      throw {
        message: 'Wrong username or password',
        statusCode: 403,
      }
    }

    const response = await fetch(`https://bio.torre.co/api/bios/${username}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw {
        message: 'User must exist in Torre.co',
        statusCode: 403,
      }
    }

    const token = await createToken(user.username)
    res.send({
      username: user.username,
      token,
      tokenTimeout: 12,
      refreshToken: user.refreshToken,
      user: (await response.json()).person,
    })
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while login the user. Please try again later',
        statusCode: 401,
      }
    } else {
      throw e
    }
  }
}

/**
 * Create user
 * @param req.body.username username from user
 * @param req.body.password password from user
 */
export const createUser = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const username = req.body.username
    let password = req.body.password
    let user = await queries.findUser(username)
    if (user) {
      throw { message: 'User already exists', statusCode: 422 }
    }

    const response = await fetch(`https://bio.torre.co/api/bios/${username}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw {
        message: 'User must exist in Torre.co',
        statusCode: 403,
      }
    }
    password = await hashPassword(password)
    const refreshToken = await createRefreshToken()
    user = await queries.createUser(username, password, refreshToken)

    const token = await createToken(user.username)
    res.send({ username: user.username, token, tokenTimeout: 12, refreshToken })
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while creating the user. Please try again later',
        statusCode: 401,
      }
    } else {
      throw e
    }
  }
}

/**
 * Refresh an user token given the refreshToken
 * @param req.body.username username from the user
 * @param req.body.refreshToken refresh token used for verifying the user
 */
export const refreshToken = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const refreshToken = req.body.refreshToken
    const user = await queries.findUser(req.body.username)
    if (!user) {
      throw { message: 'User not found', statusCode: 404 }
    }
    if (user.refreshToken !== refreshToken) {
      throw {
        message: 'The refresh token is incorrect for this user',
        statusCode: 401,
      }
    }
    const token = await createToken(user.username)
    res.send({
      username: user.username,
      token,
      tokenTimeout: 12,
      refreshToken: user.refreshToken,
    })
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while refreshing the token. Please try again later',
      }
    } else {
      throw e
    }
  }
}
