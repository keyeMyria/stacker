import Request from './Request'

export type Side = 'left' | 'right'
export interface Position {
	side: Side,
	column: number,
	row: number
}

const sideToChar = (side: Side): string => side === 'left' ? 'L' : 'R'
const charToSide = (char: string): Side => char === 'L' ? 'left' : 'right'
const numToDoubleDigit = (num: number): string => num > 9 ? num.toString() : '0' + num
const doubleDigitToNum = (digit: string): number => Number(digit)
const numToChar = (num: number): string => String.fromCharCode(64 + num)
const charToNum = (char: string): number => char.charCodeAt(0) - 64

export default class Pallet {
	id: number
	side: Side
	column: number
	row: number
	isEmpty: boolean
	content: string
	requests: Request[]
	name: string

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