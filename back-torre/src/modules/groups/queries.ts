import mongoose, { ClientSession } from 'mongoose'
import groups from '@util/models/groups'
import IGroup from '@util/models/IGroup'

export const findGroup = async (name): Promise<IGroup | null> => {
  return await groups.findOne({ name }).exec()
}

export const createGroup = async (
  name: string,
  members: string[],
  description: string | null
): Promise<IGroup> => {
  return await groups.create({ name, description, members })
}

export const findGroups = async (groupnames: string[]): Promise<IGroup[]> => {
  return await groups.find({ groupname: { $in: groupnames } }).exec()
}

// Devuelve un objeto clientSession, el cual representa una transacción
export const getTransaction = async (): Promise<ClientSession> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  return session
}
export const getObjectId = (_id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(_id)
}

// Hace rollback a una transacción
export const rollback = async (t: ClientSession): Promise<void> => {
  await t.abortTransaction()
}

// Hace commit a una transacción
export const commit = async (t: ClientSession): Promise<void> => {
  await t.commitTransaction()
}
