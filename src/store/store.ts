import { makeAutoObservable } from 'mobx'
import AuthService from '../service/AuthService'

interface MyUser {
	email?: string | undefined
}

interface MyInvalid {
	status: boolean
	message: string
}

export default class Store {
	user = {} as MyUser
	isAuth = false
	isLoading = false
	isInvalid: MyInvalid = {
		status: false,
		message: '',
	}
	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: MyUser) {
		this.user = user
	}
	setAuth(isAuth: boolean) {
		this.isAuth = isAuth
	}

	setLoading(isLoading: boolean) {
		this.isLoading = isLoading
	}

	setInvalid(isInvalid: MyInvalid) {
		this.isInvalid = isInvalid
	}

	async registration(email: string, password: string) {
		this.setLoading(true)
		try {
			const user = await AuthService.registration(email, password)

			if (user) {
				this.setUser(user)
				this.setAuth(true)
			}
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.setInvalid({ status: true, message: e.message })
		} finally {
			this.setLoading(false)
		}
	}

	async login(email: string, password: string) {
		this.setLoading(true)
		try {
			const user = await AuthService.login(email, password)

			if (user) {
				this.setUser(user)
				this.setAuth(true)
			}
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.setInvalid({ status: true, message: e.message })
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		await AuthService.logout()
		this.setAuth(false)
	}

	async checkAuth() {
		const session = await AuthService.checkAuth()

		if (session) {
			this.setUser(session.user)
			this.setAuth(true)
		}
	}

	async discord() {
		await AuthService.discord()
	}

	async google() {
		await AuthService.google()
	}
}
