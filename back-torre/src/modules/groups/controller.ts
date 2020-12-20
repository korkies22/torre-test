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
    const description = req.body.description ? req.body.description : ''
    let members = req.body.members

    const promises: Promise<any>[] = []
    const set = new Set<string>()

    //If array is empty or the only element is the same user
    if (
      members.length === 0 ||
      (members.length === 1 && members[0] === req.user!)
    ) {
      throw {
        message: 'You need to include at least one other person',
        statusCode: 422,
      }
    }

    //We use a set to delete duplicates
    for (const member of members) {
      set.add(member)
    }
    set.add(req.user!)
    members = [...set.values()]
    for (const member of members) {
      promises.push(checkMember(member))
    }

    const richMembers = await Promise.all(promises)

    const totalWeight = richMembers.reduce((accum, member) => {
      return accum + member.weight
    }, 0)

    const group = await queries.createGroup(
      name,
      description,
      members,
      totalWeight
    )
    res.send(group)
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while creating the group. Please try again later',
      }
    } else {
      throw e
    }
  }
}

/**
 * Gets groups in which the current user is a member
 */
export const getGroups = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const groups = await queries.getGroupsFromUser(req.user!)
    res.send(groups)
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while fetching groups. Please try again later',
      }
    } else {
      throw e
    }
  }
}

/**
 * Gets groups in which the current user is a member
 * @param req.params.id group id
 */
export const getGroupById = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    let group = await queries.findGroupById(queries.getObjectId(req.params.id))
    if (!group) {
      throw { message: 'The group with that Id doesnt exist', statusCode: 404 }
    }
    const me = group.members.find((member) => member === req.user!)
    if (!me) {
      throw { message: 'You are not part of that group', statusCode: 401 }
    }

    const promises: Promise<any>[] = []
    for (const member of group.members) {
      promises.push(checkMember(member))
    }

    const richMembers = await Promise.all(promises)

    group = group.toJSON()
    res.send({ ...group, members: richMembers })
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while fetching groups. Please try again later',
      }
    } else {
      throw e
    }
  }
}
