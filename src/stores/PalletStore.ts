import { observable, action } from 'mobx'

import PalletRequest from './interfaces/PalletRequest'
import Pallet, { PalletParams } from './common/Pallet'
import { NoPalletException } from './common/Errors'
import Priority from './types/Priority'

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
		this.requestTestPallets()
	}

	@action switchSide(side: string): void {
		this.showSide = side
	}

	@action requestPallet(name: string, priority?: Priority): void {
		let pallet: Pallet | undefined 
		pallet = this.pallets.find((p: Pallet) => p.getName() === name)

		if(!pallet)
			return

		let request: PalletRequest = {
			id: pallet.id,
			palletId: pallet.id,
			requester: 'Jan Novák',
			location: 'Sklad 1. patro',
			priority: priority || 'standard',
			requestedAt: new Date(),
			isCompleted: false,
			pallet
		}

		this.requests.push(request)
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

	findPallet(params: PalletParams): Pallet {
		let pallet: Pallet | undefined
		pallet = this.pallets.find(p => (
			p.side === params.side
			&& p.column === params.column
			&& p.row === params.row
		))

		if(pallet === undefined) {
			throw new NoPalletException()
		}

		return pallet
	}

	requestTestPallets(): void {
		this.requestPallet('L11A')
		this.requestPallet('L26B', 'high')
		this.requestPallet('L51E')
		this.requestPallet('L53F', 'urgent')
		this.requestPallet('R42A', 'low')
		this.requestPallet('R06C')
	}
}
