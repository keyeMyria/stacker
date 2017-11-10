import { observable, action } from 'mobx'

import PalletRequest, { PalletRequestBase } from './interfaces/PalletRequest'

export default class PalletSelectStore {
	static nextId: number = 0

	@observable requests: PalletRequest[]

	constructor() {
		this.requests = []
	}

	@action addRequest(request: PalletRequestBase): void {
		this.requests.push({
			id: PalletSelectStore.nextId++,
			isCompleted: false,
			requestedAt: new Date(),
			palletId: request.palletId,
			requester: request.requester,
			location: request.location,
			priority: request.priority
		})
	}

	initRequests(): void {
		this.addRequest({
			palletId: 0,
			requester: 'Jan Novak',
			location: 'Prizemi',
			priority: 'standard'
		})
		this.addRequest({
			palletId: 0,
			requester: 'Jan Novak',
			location: 'Prizemi',
			priority: 'standard'
		})
		this.addRequest({
			palletId: 0,
			requester: 'Jan Novak',
			location: 'Prizemi',
			priority: 'standard'
		})
	}
}