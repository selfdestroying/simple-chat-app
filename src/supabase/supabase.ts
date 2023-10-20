import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASEURL || ''

const supabaseKey = import.meta.env.VITE_SUPABASEKEY || ''

export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!)
