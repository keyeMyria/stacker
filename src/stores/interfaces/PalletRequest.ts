import Priority from '../types/Priority'
import Pallet from '../common/Pallet'

export interface RequestParams {
	requester: string,
	location: string,
	priority: Priority
}

export default interface PalletRequest extends RequestParams {
	id: number,
	requestedAt: Date,
	isCompleted: boolean,
	palletId: number,
	pallet: Pallet
}