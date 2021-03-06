import Pallet from '../../models/Pallet'
import Priority from '../types/Priority'

export interface RequestParams {
	requester: string,
	location: string,
	priority: Priority
}

export type RequestStatus = 'requested' | 'delivered' | 'toReturn' | 'completed'

export default interface PalletRequest extends RequestParams {
	id: number,
	status: RequestStatus,
	requestedAt: Date,
	isCompleted: boolean,
	palletId: number,
	pallet: Pallet
}
