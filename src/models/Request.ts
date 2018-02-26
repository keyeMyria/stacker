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
	palletName: string
	requester: string
	requestedAt: Date
	deliveredAt: Date
	returnedAt: Date

	constructor(request?: Request) {
		if (request) {
			Object.assign(this, request)
		}
	}
}
