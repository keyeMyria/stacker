import { observable, action } from 'mobx'
import axios from 'axios'
import * as jwtDecode from 'jwt-decode'

import User from '../models/User'

const baseURL: string = 'http://localhost:8080/'
const authApi = axios.create({ baseURL: baseURL + 'auth' })
const userApi = axios.create({ baseURL: baseURL + 'stacker/user' })
const palletApi = axios.create({ baseURL: baseURL + 'stacker/pallet' })

const getUserFromLocalStorage = () => {
	const token = localStorage.getItem('token')

	if(token !== null)
		return jwtDecode(token)
}

export default class AppStore {
	@observable isAuthenticated: boolean
	@observable hasAuthError: boolean
	@observable authError: string

	@observable user: User

	constructor() {
		this.hasAuthError = false

		this.verify()
	}

	@action async login(username: string, password: string): Promise<void> {
		try {
			const response = await authApi.post('login', {
				username,
				password
			})

			localStorage.setItem('token', response.data.token)

			this.user = await this.fetchUser()

			this.isAuthenticated = true
			this.hasAuthError = false
		} catch(err) {
			this.authError = err.response.data
			this.hasAuthError = true
		}
	}

	@action async verify(): Promise<void> {
		const token = localStorage.getItem('token')

		if(token === null) {
			this.isAuthenticated = false
			return
		}

		try {
			const response = await authApi.post('verify', { token })

			localStorage.setItem('token', response.data.token)

			this.user = await this.fetchUser()

			this.isAuthenticated = true
		} catch(err) {
			this.isAuthenticated = false
		}
	}

	@action logout(): void {
		localStorage.removeItem('token')
		this.isAuthenticated = false
	}

	async fetchUser(): Promise<User> {
		const response = await userApi.post('', getUserFromLocalStorage())

		return response.data
	}

	/** 
	 * Helper function to initialize all pallets at the start of production
	*/
	@action async initializePallets(): Promise<void> {
		for(let i = 1; i <= 8; i++) {
			for(let j = 1; j <= 71; j++) {
				try {
					await palletApi.post('', {
						row: i,
						column: j,
						side: 'left'
					})
					await palletApi.post('', {
						row: i,
						column: j,
						side: 'right'
					})
				} catch(err) {
					console.log(err)
				}
			}
		}
	}
}