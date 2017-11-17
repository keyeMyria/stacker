export class NoPalletError extends Error {
    constructor() {
        super('Can\'t find specified pallet')
    }
}