import Request from './Request'
import StatusChange from './StatusChange'

export default class User {
	username: string
	firstName: string
	lastName: string
	isAdmin: boolean
	isWorker: boolean
	requests?: Request[]
	statusChange?: StatusChange
	fullName: string

	constructor(user?: User) {
		if (user) {
			Object.assign(this, user)
		}
	}
}
