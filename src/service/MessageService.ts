import { supabase } from '../supabase/supabase'

export default class MessageService {
	static async getMessages() {
		const { data } = await supabase.from('messages').select('*')
		return data
	}

	static async sendMessage(message: string) {
		await supabase.from('messages').insert({ message })
	}
}
