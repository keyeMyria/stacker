import { action, observable } from 'mobx'

import Pallet from '../models/Pallet'
import { AlreadySelectedError } from './common/Errors'
import PalletRequest, { RequestParams, RequestStatus } from './interfaces/PalletRequest'

import PalletStore from './PalletStore'

export default class PalletSelectStore {
	static nextId: number = 0
	palletStore: PalletStore

	@observable requests: PalletRequest[]

	constructor(palletStore: PalletStore) {
		this.palletStore = palletStore
		this.requests = []

		// this.initRequests()
	}

	@action addRequest(palletParams: any, requestParams: RequestParams): void {
		const pallet: Pallet = this.palletStore.findPallet(palletParams)

		for (const r of this.requests) {
			if (r.id === pallet.id) {
				throw new AlreadySelectedError('Pallet')
			}
		}

		const request: PalletRequest = {
			id: PalletSelectStore.nextId++,
			status: 'requested',
			isCompleted: false,
			requestedAt: new Date(),
			palletId: pallet.id,
			pallet,
			requester: requestParams.requester,
			location: requestParams.location,
			priority: requestParams.priority
		}

		this.requests.push(request)
	}

	@action cancel(id: number): void {
		this.requests = this.requests.filter(r => r.id !== id)
	}

	@action deliver(id: number): void {
		this.requests.forEach(r => {
			if (r.id === id) {
				r.status = 'delivered'
			}
		})
	}

	@action return(id: number): void {
		this.requests.forEach(r => {
			if (r.id === id) {
				r.status = 'toReturn'
			}
		})
	}

	@action complete(id: number): void {
		this.requests.forEach(r => {
			if (r.id === id) {
				r.status = 'completed'
				r.isCompleted = true
			}
		})
	}

	getRequestsByStatus(status: RequestStatus): PalletRequest[] {
		return this.requests.filter(r => r.status === status)
	}

	initRequests(): void {
		this.addRequest({
			side: 'left',
			column: 1,
			row: 'A'
		}, {
			requester: 'Jan Novák',
			location: 'Přízemí',
			priority: 'standard'
		})
		this.addRequest({
			side: 'right',
			column: 71,
			row: 'H'
		}, {
			requester: 'Jan Novák',
			location: 'Přízemí',
			priority: 'standard'
		})
		this.addRequest({
			side: 'right',
			column: 67,
			row: 'G'
		}, {
			requester: 'Jan Novák',
			location: 'Přízemí',
			priority: 'standard'
		})
		this.addRequest({
			side: 'left',
			column: 39,
			row: 'C'
		}, {
			requester: 'Jan Novák',
			location: 'Přízemí',
			priority: 'standard'
		})
	}
}
