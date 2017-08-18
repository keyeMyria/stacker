import { observable, action } from 'mobx'

export class PalletStorage {
	static nextId: number = 0

	@observable id: number
	@observable palletName: string
	@observable isEmpty: boolean

	constructor(rowName: string, column: number) {
		this.id = PalletStorage.nextId++

		if(column < 9)
			this.palletName = `0${column.toString()}${rowName}`
		else
			this.palletName = `${column.toString()}${rowName}`

		this.isEmpty = false
	}

	@action toggleEmpty(): void {
		this.isEmpty = !this.isEmpty
	}
}

export class PalletStorageRow {
	static nextId: number = 0

	@observable id: number
	@observable rowName: string
	@observable storages: PalletStorage[] = []

	constructor() {
		this.id = PalletStorageRow.nextId++
		this.rowName = String.fromCharCode(65 + this.id)
	}

	generate() {
		for(let i = 0; i < 14; i++) {
			this.storages.push(new PalletStorage(this.rowName, i + 1))
		}
	}
}

export default class PalletStore {
	@observable storageRows: PalletStorageRow[] = []

	constructor() {
		for(let i = 0; i < 8; i++) {
			const row = new PalletStorageRow()
			row.generate()
			this.storageRows.push(row)
		}
	}
}
