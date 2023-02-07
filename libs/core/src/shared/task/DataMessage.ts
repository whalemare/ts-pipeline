import { Primitive } from 'type-fest'

export type DataMessageValue = Primitive

export interface DataMessage {
  type: 'message'
  value: DataMessageValue
}
