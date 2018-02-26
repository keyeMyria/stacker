import { action, observable } from 'mobx'
import Request from '../models/Request'

export default class SearchStore {
	@observable filterText: string
	@observable filterField: string

	constructor() {
		this.filterText = ''
		this.filterField = 'name'
	}

	@action changeFilterText(text: string): void {
		this.filterText = text
	}

	@action changeFilterField(field: string): void {
		this.filterField = field
	}

	filter = (i: Request) => {
		if (this.filterField === 'name') {
			if (i.pallet.name.toLowerCase().search(this.filterText) > -1) {
				return i
			}
		}
	}
}
