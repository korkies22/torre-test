import { searchOpportunities } from '@util/torre'
import express from 'express'
export const router = express.Router()

/**
 * @description Get the best opportunities for the current user in a paginated way
 * @param req.query Contains information about pagination
 */
export const getOpportunities = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const query = req.query
    let page = 0
    if (query.page) {
      page = +query.page
    }
    const user = req.user!

    const result = await searchOpportunities(
      user,
      page,
      10,
      query.role ? query.role.toString() : null
    )
    res.send(result)
  } catch (e) {
    console.log(e)
    if (!e.statusCode) {
      throw new Error('There has been a problem searching opportunities')
    } else {
      throw e
    }
  }
}
