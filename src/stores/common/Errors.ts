export class NoPalletException extends Error {
    constructor() {
        super('Can\'t find specified pallet')
    }
}