import { supabase } from '../supabase/supabase'
const getURL = () => {
	let url =
		import.meta.env.VITE_SITE_URL ?? // Set this to your site URL in production env.
		import.meta.env.VITE_VERCEL_URL ?? // Automatically set by Vercel.
		'http://localhost:3000/'
	console.log(url)

	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`
	// Make sure to include a trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
	return url
}
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
			data: { session },
		} = await supabase.auth.getSession()

		return session
	}

	static async discord() {
		const { data } = await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: getURL(),
			},
		})

		return { data }
	}

	static async google() {
		const { data } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getURL(),
			},
		})

		return { data }
	}
}
