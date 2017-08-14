import { observable } from 'mobx'

export class PalletStorage {
	static nextId: number = 0

	@observable id: number
	@observable palletName: string

	constructor(palletName: string) {
		this.id = PalletStorage.nextId++
		this.palletName = palletName
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
		for(let i = 0; i < 10; i++) {
			this.storages.push(new PalletStorage(i.toString()))
		}
	}
}

export default class PalletStore {
	@observable storageRows: PalletStorageRow[] = []

	constructor() {
		for(let i = 0; i < 4; i++) {
			const row = new PalletStorageRow()
			row.generate()
			this.storageRows.push(row)
		}
	}
}
