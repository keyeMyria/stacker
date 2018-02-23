import { observable, action } from 'mobx'
import axios from 'axios'
import PalletRequest from './interfaces/PalletRequest'
import { NoPalletError } from './common/Errors'

import Pallet from '../models/Pallet'

const baseURL: string = 'http://localhost:8080/stacker/'
const api = axios.create({ baseURL: baseURL + 'pallet/' })

export default class PalletStore {
	@observable showSide: string

	@observable fetchingPallets: boolean

	pallets: Pallet[]
	requests: PalletRequest[]
	rowCount: number
	columnCount: number

	constructor() {
		this.showSide = 'left'
		this.fetchingPallets = true

		this.pallets = []
		this.requests = []
		this.rowCount = 8
		this.columnCount = 71

		this.fetchPallets()
	}

	@action switchSide(side: string): void {
		this.showSide = side
	}

	async fetchPallets(): Promise<void> {
		const response = await api.get<Pallet[]>('')

		this.pallets = response.data.map(p => new Pallet(p))
		this.pallets = this.sortPallets()
		this.fetchingPallets = false
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
		for (let i = 1; i <= this.rowCount; i++) {
			let palletPair: Pallet[] = []
			palletColumn.filter(p => p.row === i).forEach(p => palletPair.push(p))
			pallets.push(palletPair)
		}

		return pallets
	}

	getPalletsFromRow(side: string, row: number): Pallet[] {
		return this.pallets.filter((p: Pallet): boolean => (
			p.side === side && p.row === row
		))
	}

	getPalletsFromRowByIndex(side: string, index: number): Pallet[] {
		return this.getPalletsFromRow(side, index)
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

	findPallet(params: any): Pallet {
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

	sortPallets(): Pallet[] {
		return this.pallets.sort((a, b) => {
			const rows = a.row - b.row
			const columns = a.column - b.column
			const sides = a.side === 'left' ? -1 : 1

			return rows !== 0 ? rows : columns !== 0 ? columns : sides
		})
	}
}
