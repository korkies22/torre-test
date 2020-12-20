import { checkMember } from '@util/torre'
import express from 'express'
export const router = express.Router()
import * as queries from './queries'
import { validationErrorHandler } from './validator'

/**
 * Creates a group in my group app
 * @param req.body.name group name
 * @param req.body.description group description (Optional)
 * @param req.body.members List of group members, they must exist in Torre.co
 */
export const createGroup = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const name = req.body.name
    const description = req.body.description
    const members = req.body.members

    const promises: Promise<any>[] = []
    for (const member of members) {
      promises.push(checkMember(member))
    }

    try {
      await Promise.all(promises)
    } catch (err) {
      throw {
        message: 'At least one user is not part of Torre.co',
        statusCode: 422,
      }
    }

    const group = await queries.createGroup(name, description, members)
    res.send(group)
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
