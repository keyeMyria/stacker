import Pallet from './Pallet'
import User from './User'
import StatusChange, { StatusName } from './StatusChange'

export type Priority = 'urgent' | 'high' | 'standard' | 'low'

export default class Request {
	id: number
	priority: string
	location: string
	statusName: StatusName
	pallet: Pallet
	user: User
	statusChanges: StatusChange[]
	palletId: number
}