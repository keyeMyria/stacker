import axios from 'axios'
import { action, observable } from 'mobx'

import PalletType from './PalletType'
import Request from './Request'

export type Side = 'left' | 'right'
export interface Position {
	side: Side,
	column: number,
	row: number
}

const baseURL: string = 'http://localhost:8080/stacker/'
const api = axios.create({ baseURL: baseURL + 'pallet' })
const apiType = axios.create({ baseURL: baseURL + 'palletType' })

const sideToChar = (side: Side): string => side === 'left' ? 'L' : 'R'
const charToSide = (char: string): Side => char === 'L' ? 'left' : 'right'
const numToDoubleDigit = (num: number): string => num > 9 ? num.toString() : '0' + num
const doubleDigitToNum = (digit: string): number => Number(digit)
const numToChar = (num: number): string => String.fromCharCode(64 + num)
export const charToNum = (char: string): number => char.charCodeAt(0) - 64

export const stringToSide = (side: string): Side => side === 'left' ? 'left' : 'right'

export const fetchPalletTypes = async () => {
	try {
		const response = await apiType.get<PalletType[]>('')

		return response.data
	} catch (err) {
		console.log(err)
	}

	return []
}

export interface PalletParams {
	side: Side
	column: number
	row: number
}

export default class Pallet implements PalletParams {
	id: number
	side: Side
	column: number
	row: number
	@observable isEmpty: boolean
	@observable isDisabled: boolean
	@observable content: string
	requests: Request[]
	@observable types: PalletType[]
	name: string

	@observable pristineContent: boolean
	originalContent: string

	constructor(pallet?: Pallet) {
		if (pallet) {
			Object.assign(this, pallet)
		}

		this.content = this.originalContent = this.content || ''
		this.pristineContent = true
	}

	@action async toggleEmpty(): Promise<void> {
		try {
			await api.get<Pallet>(this.id + '/action/empty')

			this.isEmpty = !this.isEmpty
		} catch (err) {
			console.log(err)
		}
	}

	@action changeContent(content: string): void {
		this.pristineContent = false
		this.content = content

		if (
			content === this.originalContent ||
			(content === '' && this.originalContent === null)
		) {
			this.pristineContent = true
		}
	}

	@action async savePalletContent(): Promise<void> {
		try {
			await api.post<Pallet>(this.id + '/action/changeContent', {
				content: this.content
			})

			this.pristineContent = true
		} catch (err) {
			console.log(err)
		}
	}

	@action async addType(type: PalletType): Promise<void> {
		try {
			await api.post<Pallet>(this.id + '/action/addType', {
				typeId: type.id
			})

			this.types = [ ...this.types, type ]
		} catch (err) {
			console.log(err)
		}
	}

	@action async deleteType(type: PalletType): Promise<void> {
		try {
			await api.post<Pallet>(this.id + '/action/deleteType', {
				typeId: type.id
			})

			this.types = this.types.filter(t => t.id !== type.id)
		} catch (err) {
			console.log(err)
		}
	}

	getSideName(): string {
		return this.side === 'left' ? 'Levá' : 'Pravá'
	}

	getRowChar(): string {
		return numToChar(this.row)
	}

	static rowChar(row: number): string {
		return String.fromCharCode(65 + row)
	}

	static toName(side: Side, column: number, row: number): string {
		return sideToChar(side) + numToDoubleDigit(column) + numToChar(row)
	}

	static fromName(name: string): Position {
		return {
			side: charToSide(name.substr(0, 1)),
			column: doubleDigitToNum(name.substr(1, 2)),
			row: charToNum(name.substr(3, 1))
		}
	}
}
