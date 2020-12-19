import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import express from 'express'

/**
 * Verifies an user token
 * @param req express request parameter
 */
export async function tokenVerifier(req: express.Request): Promise<string> {
  const token = req.header('Authorization')
  if (!token) {
    throw {
      message: 'User must be authenticated in order to use this function',
      statusCode: 401,
    }
  }
  const username = (await new Promise((resolve) => {
    jwt.verify(token, process.env.privateKey, function (err, decoded) {
      if (err) {
        console.log(err)
        throw { message: 'Invalid Token', statusCode: 401 }
      } else {
        resolve(decoded.username)
      }
    })
  })) as string
  return username
}

/**
 * Hashes an user password
 * @param password password to be hashed
 */
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password.trim(), 12)
}

/**
 * Creates a token given a username
 * @param username username to be included
 */
export const createToken = (username: string): Promise<string> =>
  jwt.sign(
    {
      username,
    },
    process.env.privateKey,
    { expiresIn: '12h' }
  )

/**
 * Creates a refreshToken, basically a random long string
 */
export const createRefreshToken = (): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    crypto.randomBytes(50, function (err, buffer) {
      if (err) {
        reject(err)
      }
      const token = buffer.toString('hex')
      resolve(token)
    })
  })

/**
 * Checks an string password vs a hashed password. Used to auth purposes
 */
export const checkPassword = (password, hashedPassword): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
