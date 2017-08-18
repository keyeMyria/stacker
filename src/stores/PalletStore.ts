import { observable, action } from 'mobx'

export class PalletStorage {
	static nextId: number = 0

	@observable id: number
	@observable palletName: string
	@observable isEmpty: boolean

	constructor(palletName: string) {
		this.id = PalletStorage.nextId++
		this.palletName = palletName
		this.isEmpty = false
	}

	@action toggleEmpty(): void {
		this.isEmpty = !this.isEmpty
	}
}

export class PalletStorageRow {
	static nextId: number = 0

	@observable id: number
	@observable storages: PalletStorage[] = []

	constructor() {
		this.id = PalletStorageRow.nextId++
	}

	generate() {
		for(let i = 0; i < 14; i++) {
			this.storages.push(new PalletStorage(i.toString()))
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
