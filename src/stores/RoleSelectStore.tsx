import axios from 'axios'
import { action, observable } from 'mobx'

import User from '../models/User'

const baseURL: string = 'http://localhost:8080/stacker/user'
const api = axios.create({ baseURL })

export default class RoleSelectStore {
	@observable fetchingUsers: boolean

	@observable role: string

	@observable selectedUser: string
	@observable users: User[]

	constructor() {
		this.fetchingUsers = false
		this.selectedUser = ''

		this.role = 'admin'

		this.fetchUsers()
	}

	@action changeRole(role: string) { this.role = role }
	@action changeSelected(selected: string) { this.selectedUser = selected }

	@action addRole(user: User): void {
		if (this.role === 'admin') {
			user.isAdmin = true
		} else if (this.role === 'worker') {
			user.isWorker = true
		}

		this.updateUser(user)
	}

	@action removeRole(user: User): void {
		if (this.role === 'admin') {
			user.isAdmin = false
		} else if (this.role === 'worker') {
			user.isWorker = false
		}

		this.updateUser(user)
	}

	@action async updateUser(user: User): Promise<void> {
		try {
			await api.patch<User[]>(user.username, user)
			this.users = this.users.map(u => u.username === user.username ? user : u)
		} catch (err) {
			console.log(err)
		}
	}

	async fetchUsers(): Promise<void> {
		this.fetchingUsers = true

		try {
			const response = await api.get<User[]>('')
			this.users = response.data.map(u => new User(u))
		} catch (err) {
			console.log(err)
		}

		this.fetchingUsers = false
	}
}
