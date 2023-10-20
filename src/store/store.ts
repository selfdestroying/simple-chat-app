import { User } from '@supabase/supabase-js'
import { makeAutoObservable } from 'mobx'
import { Tables } from '../../database.types'
import AuthService from '../service/AuthService'
import MessageService from '../service/MessageService'
import UserService from '../service/UserService'

interface MyInvalid {
	status: boolean
	message: string
}

export default class Store {
	user: User | null | undefined
	messages: Tables<'messages'>[] | null | undefined
	users: Tables<'users'>[] | null | undefined
	isAuth: boolean = false
	isLoading: boolean = false
	isInvalid: MyInvalid = {
		status: false,
		message: '',
	}
	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: User) {
		this.user = user
	}
	setUsers(users: Tables<'users'>[] | null) {
		this.users = users
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
	setMessages(messages: Tables<'messages'>[] | null) {
		this.messages = messages
	}

	async registration(email: string, password: string) {
		this.setLoading(true)
		try {
			const user = await AuthService.registration(email, password)

			if (user) {
				this.setUser(user)
				this.setAuth(true)
			}
		} catch (error) {
			let errorMessage = 'Failed to do something exceptional'
			if (error instanceof Error) {
				errorMessage = error.message
				this.setInvalid({ status: true, message: error.message })
			}
			console.log(errorMessage)
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
		} catch (error) {
			let errorMessage = 'Failed to do something exceptional'
			if (error instanceof Error) {
				errorMessage = error.message
				this.setInvalid({ status: true, message: error.message })
			}
			console.log(errorMessage)
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		await AuthService.logout()
		this.setAuth(false)
	}

	async checkAuth() {
		const user = await AuthService.checkAuth()

		if (user) {
			this.setUser(user)
			this.setAuth(true)
		}
	}

	async discord() {
		await AuthService.discord()
	}

	async google() {
		await AuthService.google()
	}

	async getMessages() {
		const messages = await MessageService.getMessages()
		this.setMessages(messages)
	}
	async getUsers() {
		const users = await UserService.getUsers()
		this.setUsers(users)
		console.log(this.users)
	}
	async sendMessage(message: string) {
		await MessageService.sendMessage(message)
	}
}
