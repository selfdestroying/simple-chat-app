import { supabase } from '../supabase/supabase'

export default class AuthService {
	static async registration(email: string, password: string) {
		const {
			data: { user },
			error,
		} = await supabase.auth.signUp({
			email,
			password,
		})
		if (error) {
			throw error
		}

		return user
	}

	static async login(email: string, password: string) {
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			throw error
		}

		return user
	}

	static async logout() {
		await supabase.auth.signOut()
	}

	static async checkAuth() {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		return user
	}

	static async discord() {
		const { data } = await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: 'http://localhost:5173',
			},
		})

		return { data }
	}

	static async google() {
		const { data } = await supabase.auth.signInWithOAuth({
			provider: 'google',
		})

		return { data }
	}
}
