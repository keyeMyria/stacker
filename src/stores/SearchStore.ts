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

	search = (text: string, searchText: string): boolean => {
		return text.toLowerCase().search(searchText.toLowerCase()) > -1 ? true : false
	}

	filter = (i: Request) => {
		switch (this.filterField) {
			case 'name': {
				return this.search(i.pallet.name, this.filterText) ? i : undefined
			}
			case 'location': {
				return this.search(i.location, this.filterText) ? i : undefined
			}
			case 'requester': {
				return this.search(i.requester, this.filterText) ? i : undefined
			}
		}
	}
}
