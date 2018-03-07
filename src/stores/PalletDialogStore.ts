import axios from 'axios'
import { action, observable } from 'mobx'

import ErrorSnackbar from '../components/common/ErrorSnackbar'
import Pallet from '../models/Pallet'

const baseURL: string = 'http://localhost:8080/stacker/'
const api = axios.create({ baseURL: baseURL + 'pallet/' })

export default class PalletDialogStore {
	@observable fetchingPallet: boolean
	@observable pristinePalletContent: boolean
	@observable palletContent: string
	@observable isEmpty: boolean

	errorHandler: ErrorSnackbar

	palletId: number
	pallet: Pallet

	constructor(palletId: number) {
		this.palletId = palletId
		this.fetchingPallet = true
		this.pristinePalletContent = true
		this.palletContent = ''

		this.fetchPallet(palletId)
	}

	@action changePalletContent(content: string): void {
		this.pristinePalletContent = false
		this.palletContent = content

		if (
			content === this.pallet.content ||
			(content === '' && this.pallet.content === null)
		) {
			this.pristinePalletContent = true
		}
	}

	@action async savePalletContent(): Promise<void> {
		try {
			await api.post<Pallet>(this.palletId + '/action/changeContent', {
				content: this.palletContent
			})

			this.pallet.content = this.palletContent
			this.pristinePalletContent = true
		} catch (err) {
			this.errorHandler.handleDisplayError(err.response.data)
		}
	}

	@action async toggleEmpty(): Promise<void> {
		try {
			await api.get(this.palletId + '/action/empty')

			this.isEmpty = !this.isEmpty
		} catch (err) {
			console.log(err)
		}
	}

	async fetchPallet(palletId: number): Promise<void> {
		try {
			const response = await api.get<Pallet>(palletId.toString())

			this.pallet = new Pallet(response.data)
			this.fetchingPallet = false

			this.palletContent = this.pallet.content || ''
			this.isEmpty = this.pallet.isEmpty
		} catch (err) {
			this.errorHandler.handleDisplayError(err.response.data)
		}
	}
}
