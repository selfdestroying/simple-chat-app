import { supabase } from '../supabase/supabase'

export default class UserService {
	static async getUsers() {
		const { data } = await supabase.from('users').select('*')
		return data
	}
	static async getUserById(id: string) {
		const { data } = await supabase.from('users').select('*').eq('id', id)
		return data
	}
}
