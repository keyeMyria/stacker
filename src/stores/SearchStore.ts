import { observable, action } from 'mobx'
import PalletRequest from './interfaces/PalletRequest'

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

	filter = (i: PalletRequest) => {
		if(this.filterField === 'name') {
			if(i.pallet.getName().toLowerCase().search(this.filterText) > -1)
				return i
		} else if(this.filterField === 'location' || this.filterField === 'requester') {
			if(i[this.filterField].search(this.filterText) > -1)
				return i
		}
	}
}