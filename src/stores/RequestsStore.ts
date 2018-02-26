import axios from 'axios'
import { action, observable } from 'mobx'

import Request, { RequestParams } from '../models/Request'
import { StatusName } from '../models/StatusChange'

import ErrorSnackbar from '../components/common/ErrorSnackbar'

const baseURL: string = 'http://localhost:8080/stacker/'
const api = axios.create({ baseURL: baseURL + 'request/' })

export default class PalletSelectStore {
	static nextId: number = 0
	errorHandler: ErrorSnackbar

	@observable requests: Request[]

	fetchingRequests: boolean

	constructor() {
		this.requests = []

		this.fetchRequests()
	}

	async fetchRequests(): Promise<void> {
		this.fetchingRequests = true

		try {
			const response = await api.get<Request[]>('')
			this.requests = response.data.map(r => new Request(r))
		} catch (err) {
			console.log(err)
		}

		this.fetchingRequests = false
	}

	@action async createRequest(requestParams: RequestParams, palletName: string) {
		try {
			const response = await api.post<Request>('', {
				requestParams,
				palletName
			})

			this.requests.push(new Request(response.data))
		} catch (err) {
			this.errorHandler.handleDisplayError(err.response.data)
		}
	}

	@action cancel(id: number): void {
		this.requests = this.requests.filter(r => r.id !== id)
	}

	@action deliver(id: number): void {
		this.requests.forEach(r => {
			if (r.id === id) {
				r.statusName = 'delivered'
			}
		})
	}

	@action return(id: number): void {
		this.requests.forEach(r => {
			if (r.id === id) {
				r.statusName = 'toReturn'
			}
		})
	}

	@action complete(id: number): void {
		this.requests.forEach(r => {
			if (r.id === id) {
				r.statusName = 'completed'
			}
		})
	}

	getRequestsByStatus(status: StatusName): Request[] {
		return this.requests.filter(r => r.statusName === status)
	}
}
