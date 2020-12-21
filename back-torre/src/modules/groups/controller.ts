import { checkMember, searchOpportunity } from '@util/torre'
import express from 'express'
export const router = express.Router()
import eventEmitter from '@util/events'
import * as queries from './queries'
import { validationErrorHandler } from './validator'
import IGroup from '@util/models/IGroup'

//Gets "complete" group. This loads the members and opportunities data according to torre api
// and return the group with these parameters instead of only the string ones
const getCompleteGroup = async (group: IGroup): Promise<any> => {
  let promises: Promise<any>[] = []
  for (const member of group.members) {
    promises.push(checkMember(member))
  }
  const richMembers = await Promise.all(promises)
  promises = []
  for (const opportunity of group.opportunities) {
    promises.push(searchOpportunity(opportunity))
  }
  const richOpportunities = await Promise.all(promises)

  const respGroup = group.toJSON()
  return {
    ...respGroup,
    members: richMembers,
    opportunities: richOpportunities,
  }
}

/**
 * Creates a group consisting of a name, members and optionally a description and video
 * @param req.body.name group name
 * @param req.body.description group description (Optional)
 * @param req.body.members List of group members, they must exist in Torre.co
 * @param req.file group video, in order to showcase the group (Optional)
 */
export const createGroup = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const name = req.body.name
    const description = req.body.description ? req.body.description : ''
    let members = req.body.members.split(',')

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

    const videoURL = req.file ? req.file.path : null
    const group = await queries.createGroup(
      name,
      description,
      members,
      totalWeight,
      videoURL
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
 * Adds an opportunity to a group
 * @param req.body.groupId group id
 * @param req.body.opportunityId opportunity ID (Given by torre)
 */
export const addOpportunity = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const groupId = req.body.groupId
    const opportunityId = req.body.opportunityId

    const group = await queries.findGroupById(groupId)

    if (!group) {
      throw {
        message: "The group with that id doesn't exists",
        statusCode: 403,
      }
    }

    let found = false
    for (const member of group.members) {
      if (member === req.user!) {
        found = true
        break
      }
    }
    if (!found) {
      throw { message: 'You are not part of that group', statusCode: 403 }
    }

    found = false
    for (const opportunitiy of group.opportunities) {
      if (opportunitiy === opportunityId) {
        found = true
        break
      }
    }
    if (found) {
      throw {
        message: 'The group has already applied to this job',
        statusCode: 422,
      }
    }

    try {
      await searchOpportunity(opportunityId)
    } catch (err) {
      throw {
        message: `An opportunity with id ${opportunityId} was not found`,
        statusCode: 422,
      }
    }

    group.opportunities.push(opportunityId)
    await group.save()
    res.send(group)

    eventEmitter.emit(
      'groupChanged',
      JSON.stringify(await getCompleteGroup(group))
    )
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem adding the opportunity to the group. Please try again later',
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
    try {
      queries.getObjectId(req.params.id)
    } catch (Err) {
      throw { message: 'The group with that Id doesnt exist', statusCode: 422 }
    }
    let group = await queries.findGroupById(queries.getObjectId(req.params.id))
    if (!group) {
      throw { message: 'The group with that Id doesnt exist', statusCode: 404 }
    }
    const me = group.members.find((member) => member === req.user!)
    if (!me) {
      throw { message: 'You are not part of that group', statusCode: 401 }
    }

    group = await getCompleteGroup(group)
    res.send(group)
  } catch (e) {
    if (!e.statusCode) {
      throw {
        message:
          'There has been a problem while fetching the group. Please try again later',
      }
    } else {
      throw e
    }
  }
}
