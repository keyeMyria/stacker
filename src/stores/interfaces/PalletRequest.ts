import Priority from '../types/Priority'
import Pallet from '../common/Pallet'

export interface PalletRequestBase {
	palletId: number,
	requester: string,
	location: string,
	priority: Priority
}

export default interface PalletRequest extends PalletRequestBase {
	id: number,
	requestedAt: Date,
	isCompleted: boolean,
	pallet?: Pallet
}