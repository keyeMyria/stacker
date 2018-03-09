import axios from 'axios'
import { action, observable } from 'mobx'

import User from '../models/User'

const baseURL: string = 'http://localhost:8080/stacker/user'
const api = axios.create({ baseURL })

export default class RoleSelectStore {
	@observable fetchingUsers: boolean

	@observable role: string

	@observable selectedUsers: string[]
	@observable filterUsers: string
	@observable users: User[]

	constructor() {
		this.fetchingUsers = false
		this.selectedUsers = []
		this.filterUsers = ''

		this.role = 'admin'

		this.fetchUsers()
	}

	@action changeRole(role: string) { this.role = role }
	@action changeSelected(selected: string[]) { this.selectedUsers = selected }
	@action changeFilter(filter: string) { this.filterUsers = filter }

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

	filter = (u: User) => {
		return u.fullName.toLowerCase().search(
			this.filterUsers.toLowerCase()
		) > -1 ? u : undefined
	}
}
