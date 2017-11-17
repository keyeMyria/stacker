export class NoPalletError extends Error {
    constructor() {
        super('Can\'t find specified pallet')
    }
}

export class AlreadySelectedError extends Error {
    constructor(item: string) {
        super('Requested ' + item + ' is already selected')
    }
}