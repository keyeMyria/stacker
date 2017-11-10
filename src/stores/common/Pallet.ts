import { observable, action } from 'mobx'

import PalletState from '../interfaces/PalletState'

export default class Pallet {
	static nextId: number = 0

	@observable isEmpty: boolean
	@observable state: PalletState

	id: number
	side: string
	row: string
	column: number

	constructor(side: string, row: string, column: number) {
		this.id = Pallet.nextId++

		this.side = side
		this.row = row
		this.column = column

		this.isEmpty = false
		this.state = { id: 'stored', name: 'Stored' }
	}
	
	@action toggleEmpty(): void {
		this.isEmpty = !this.isEmpty
	}

	@action request(): void {
		this.state = { id: 'requested', name: 'Requested' }
	}

	getName(): string {
		let name = ''

		name += this.side === 'left' ? 'L' : 'R'
		name += this.column < 10 ? '0' : ''
		name += this.column.toString()
		name += this.row

		return name
	}

	getRowNumber() {
		return this.row.charCodeAt(0) - 65
	}
}