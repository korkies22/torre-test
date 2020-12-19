import mongoose, { ClientSession } from 'mongoose'
import users from '@util/models/users'
import IUser from '@util/models/IUser'

export const findUser = async (username): Promise<IUser | null> => {
  return await users.findOne({ username }).exec()
}

export const createUser = async (
  username,
  password: string,
  refreshToken: string
): Promise<IUser> => {
  return await users.create({ username, password, refreshToken })
}

export const findUsers = async (usernames: string[]): Promise<IUser[]> => {
  return await users.find({ username: { $in: usernames } }).exec()
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
