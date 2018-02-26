import Pallet from './Pallet'
import StatusChange, { StatusName } from './StatusChange'
import User from './User'

export type Priority = 'urgent' | 'high' | 'standard' | 'low'

export interface RequestParams {
	priority: string
	location: string
	user: User
}

export default class Request implements RequestParams {
	id: number
	priority: Priority
	location: string
	statusName: StatusName
	pallet: Pallet
	user: User
	statusChanges: StatusChange[]
	palletId: number

	constructor(request: Request) {
		this.id = request.id
		this.priority = request.priority
		this.location = request.location
		this.statusName = request.statusName
		this.pallet = request.pallet
		this.user = request.user
		this.statusChanges = request.statusChanges
		this.palletId = request.palletId
	}
}
