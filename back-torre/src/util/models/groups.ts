import { Schema, Document } from 'mongoose'
import { PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IGroup from './IGroup'

import mongoose from 'mongoose'

const autoIndex = process.env.NODE_ENV !== 'production'

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    members: [{ type: String, required: true }],
    totalWeight: { type: Number, required: true },
    videoURL: { type: String, required: false },
  },
  { autoIndex }
)

// Index on the groupname for fast searching and pagination in order to return many
GroupSchema.index({ groupname: 1 })
GroupSchema.plugin(mongoosePaginate)

type GroupModel<T extends Document> = PaginateModel<T>

// Export the model and return your IGroup interface
export default (mongoose.models.groups as GroupModel<IGroup>) ||
  (mongoose.model<IGroup>('groups', GroupSchema) as GroupModel<IGroup>)
