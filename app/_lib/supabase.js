import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vinwfvxphsnsohpfmqle.supabase.co";

export const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY);
