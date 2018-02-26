import Request from './Request'
import User from './User'

export type StatusName = 'requested' | 'delivered' | 'toReturn' | 'completed' | 'cancelled'

export default class StatusChange {
	id: number
	statusName: StatusName
	date: Date
	request: Request
	user: User
}
