import { observable, action } from 'mobx'

import PalletState from '../interfaces/PalletState'
import PalletRequest from '../interfaces/PalletRequest'

export interface PalletParams {
	side: string
	row: string
	column: number
}

export default class Pallet implements PalletParams {
	static nextId: number = 0

	@observable isEmpty: boolean
	@observable state: PalletState

	id: number
	side: string
	row: string
	column: number
	requests: PalletRequest[]

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

	getSideName(): string {
		return this.side === 'left' ? 'Levá' : 'Pravá'
	}

	getRowNumber(): number {
		return this.row.charCodeAt(0) - 65
	}

	static rowIndex(row: string): number {
		return row.charCodeAt(0) - 65
	}

	static rowChar(row: number): string {
		return String.fromCharCode(65 + row)
	}
}