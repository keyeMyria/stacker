import { observable } from 'mobx'

import PalletRequest, { RequestParams } from './interfaces/PalletRequest'
import Pallet, { PalletParams } from './common/Pallet'

import PalletStore from './PalletStore'

export default class PalletSelectStore {
	static nextId: number = 0
	palletStore: PalletStore

	@observable requests: PalletRequest[]

	constructor(palletStore: PalletStore) {
		this.palletStore = palletStore
		this.requests = []

		this.initRequests()
	}

	addRequest(palletParams: PalletParams, requestParams: RequestParams): void {
		const pallet: Pallet = this.palletStore.findPallet(palletParams)

		this.requests.push({
			id: PalletSelectStore.nextId++,
			isCompleted: false,
			requestedAt: new Date(),
			palletId: pallet.id,
			pallet: pallet,
			requester: requestParams.requester,
			location: requestParams.location,
			priority: requestParams.priority
		})
	}

	initRequests(): void {
		this.addRequest({
			side: 'left',
			column: 1,
			row: 'A'
		}, {
			requester: 'Jan Novak',
			location: 'Prizemi',
			priority: 'standard'
		})
		this.addRequest({
			side: 'right',
			column: 67,
			row: 'G'
		}, {
			requester: 'Jan Novak',
			location: 'Prizemi',
			priority: 'standard'
		})
		this.addRequest({
			side: 'left',
			column: 39,
			row: 'C'
		}, {
			requester: 'Jan Novak',
			location: 'Prizemi',
			priority: 'standard'
		})
	}
}