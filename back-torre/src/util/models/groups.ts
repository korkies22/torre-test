import { Schema, Document, Model } from 'mongoose'
import IGroup from './IGroup'

import mongoose from 'mongoose'

const autoIndex = process.env.NODE_ENV !== 'production'

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    members: [{ type: String, required: true }],
    opportunities: { type: Array, default: [] },
    totalWeight: { type: Number, required: true },
    videoURL: { type: String, required: false },
  },
  { autoIndex }
)

// Index on the groupname for fast searching and pagination in order to return many
GroupSchema.index({ groupname: 1 })

type GroupModel<T extends Document> = Model<T>

// Export the model and return your IGroup interface
export default (mongoose.models.groups as GroupModel<IGroup>) ||
  (mongoose.model<IGroup>('groups', GroupSchema) as GroupModel<IGroup>)
