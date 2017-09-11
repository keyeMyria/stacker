import { observable, action } from 'mobx'

interface PalletState {
	id: string
	name: string
}

export class Pallet {
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

export default class PalletStore {
	@observable showSide: string

	pallets: Pallet[]
	rowCount: number
	columnCount: number

	constructor() {
		this.showSide = 'left'

		this.pallets = []
		this.rowCount = 8
		this.columnCount = 71

		this.generatePallets()
		this.requestTestPallets()
	}

	@action switchSide(side: string) {
		this.showSide = side
	}

	getRequestedPallets(): Pallet[] {
		return this.pallets.filter((p: Pallet) => p.state.id === 'requested')
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

	requestTestPallets(): void {
		let pallet: Pallet | undefined

		pallet = this.pallets.find((p: Pallet) => (
			p.side === 'left' && p.row === 'F' && p.column === 53)
		)
		if(pallet)
			pallet.request()

		pallet = this.pallets.find((p: Pallet) => (
			p.side === 'right' && p.row === 'C' && p.column === 6)
		)
		if(pallet)
			pallet.request()

		pallet = this.pallets.find((p: Pallet) => (
			p.side === 'left' && p.row === 'B' && p.column === 26)
		)
		if(pallet){
			pallet.toggleEmpty()
			pallet.request()
		}
	}
}
