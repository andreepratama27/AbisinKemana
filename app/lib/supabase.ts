import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "~/utils/constant";

const supabaseClient = () => createClient(supabaseUrl, supabaseAnonKey);
export { supabaseClient };
