import { Document } from 'mongoose'

export default interface IGroup extends Document {
  name: string
  description: string | null
  members: [string]
}
