import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

// Initialize the Supabase client. 
// NOTE: For the AI Studio preview to function without environment variables, 
// we gracefully handle missing keys. In production, these must be set.
export const supabase = createClient(supabaseUrl, supabaseKey);
