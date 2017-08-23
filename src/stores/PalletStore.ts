import { observable, action } from 'mobx'

export class Pallet {
	static nextId: number = 0

	@observable isEmpty: boolean

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
	}
	
	@action toggleEmpty(): void {
		this.isEmpty = !this.isEmpty
	}

	getName(): string {
		let name = ''

		name += this.side === 'left' ? 'L' : 'R'
		name += this.column < 10 ? '0' : ''
		name += this.column.toString()
		name += this.row

		return name
	}
}

export default class PalletStore {
	@observable showSide: string

	pallets: Pallet[]
	rowCount: number
	columnCount: number

	constructor() {
		this.showSide = 'left'

		this.pallets = []
		this.rowCount = 8
		this.columnCount = 14

		this.generatePallets()
	}

	@action switchSide(side: string) {
		this.showSide = side
	}

	generatePallets(): void {
		for (let i = 0; i < this.rowCount; i++) {
			for (let j = 0; j < this.columnCount; j++) {
				let pallet: Pallet
				pallet = new Pallet('left', String.fromCharCode(65 + i), j + 1)
				this.pallets.push(pallet)
			}
		}
		for (let i = 0; i < this.rowCount; i++) {
			for (let j = 0; j < this.columnCount; j++) {
				let pallet: Pallet
				pallet = new Pallet('right', String.fromCharCode(65 + i), j + 1)
				this.pallets.push(pallet)
			}
		}
	}

	getPalletsFromSide(side: string): Pallet[] {
		return this.pallets.filter((p: Pallet): boolean => p.side === side)
	}

	getPalletsFromRow(side: string, row: string): Pallet[] {
		return this.pallets.filter((p: Pallet): boolean => (
			p.side === side && p.row === row
		))
	}

	getPalletsFromRowByIndex(side: string, index: number): Pallet[] {
		return this.getPalletsFromRow(side, String.fromCharCode(65 + index))
	}
}
