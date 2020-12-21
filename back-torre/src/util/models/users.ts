import { Schema, Document, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IUser from './IUser'

import mongoose from 'mongoose'

const autoIndex = process.env.NODE_ENV !== 'production'

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { autoIndex }
)

// Index on the username for fast searching and pagination in order to return many
UserSchema.index({ username: 1 })
UserSchema.plugin(mongoosePaginate)

type UserModel<T extends Document> = PaginateModel<T>

// Export the model and return your IUser interface
export default (mongoose.models.users as UserModel<IUser>) ||
  (mongoose.model<IUser>('users', UserSchema) as UserModel<IUser>)
