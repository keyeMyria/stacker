import { observable, action } from 'mobx'

import PalletRequest from './interfaces/PalletRequest'
import Pallet, { PalletParams } from './common/Pallet'
import { NoPalletError } from './common/Errors'

export default class PalletStore {
	@observable showSide: string

	pallets: Pallet[]
	requests: PalletRequest[]
	rowCount: number
	columnCount: number

	constructor() {
		this.showSide = 'left'

		this.pallets = []
		this.requests = []
		this.rowCount = 8
		this.columnCount = 71

		this.generatePallets()
	}

	@action switchSide(side: string): void {
		this.showSide = side
	}

	generatePallets(): void {
		for (let i = 0; i < this.rowCount; i++) {
			for (let j = 0; j < this.columnCount; j++) {
				let pallet: Pallet
				pallet = new Pallet('left', String.fromCharCode(65 + i), j + 1)

				if(i === j) pallet.toggleEmpty()

				this.pallets.push(pallet)
			}
		}
		for (let i = 0; i < this.rowCount; i++) {
			for (let j = 0; j < this.columnCount; j++) {
				let pallet: Pallet
				pallet = new Pallet('right', String.fromCharCode(65 + i), j + 1)

				if(i === j + 1) pallet.toggleEmpty()

				this.pallets.push(pallet)
			}
		}
	}

	getPalletsFromSide(side: string): Pallet[] {
		return this.pallets.filter((p: Pallet): boolean => p.side === side)
	}
	
	getPalletsFromColumn(column: number, pair?: boolean): Pallet[] {
		return this.pallets.filter((p: Pallet): boolean => (
			p.column === column
		))
	}

	getPalletPairsFromColumn(column: number): Pallet[][] {
		let palletColumn: Pallet[]
		palletColumn = this.pallets.filter((p: Pallet): boolean => (
			p.column === column
		))

		let pallets: Pallet[][] = []
		for (let i = 0; i < this.rowCount; i++) {
			let palletPair: Pallet[] = []
			palletColumn.filter(p => p.getRowNumber() === i).forEach(p => palletPair.push(p))
			pallets.push(palletPair)
		}

		return pallets
	}

	getPalletsFromRow(side: string, row: string): Pallet[] {
		return this.pallets.filter((p: Pallet): boolean => (
			p.side === side && p.row === row
		))
	}

	getPalletsFromRowByIndex(side: string, index: number): Pallet[] {
		return this.getPalletsFromRow(side, String.fromCharCode(65 + index))
	}

	getColumns(): Pallet[][] {
		let columns: Pallet[][] = []

		for (let i = 1; i <= this.columnCount; i++) {
			let column: Pallet[]
			column = this.getPalletsFromColumn(i)
			columns.push(column)
		}

		return columns
	}

	getColumnPairs(): Pallet[][][] {
		let columns: Pallet[][][] = []

		for (let i = 1; i <= this.columnCount; i++) {
			let column: Pallet[][]
			column = this.getPalletPairsFromColumn(i)
			columns.push(column)
		}

		return columns
	}

	findPallet(params: PalletParams): Pallet {
		let pallet: Pallet | undefined
		pallet = this.pallets.find(p => (
			p.side === params.side
			&& p.column === params.column
			&& p.row === params.row
		))

		if(pallet === undefined) {
			throw new NoPalletError()
		}

		return pallet
	}
}
