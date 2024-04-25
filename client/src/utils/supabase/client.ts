
//import { supabase } from '@/app/supabase';
import * as dotenv from 'dotenv';
//import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

dotenv.config()

export function createClient() {
    //Create a supabase client on the browser with the project's credentials
    return createSupabaseClient(
        "https://jhusokmclciwqbojolcf.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodXNva21jbGNpd3Fib2pvbGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTc4NDYsImV4cCI6MjAyODQzMzg0Nn0.UHHsbJOho0tQj5UrZZ-nB_L0HRI-t2Tu735Hk_K0GNs"
    )
}

const supabase = createSupabaseClient("https://jhusokmclciwqbojolcf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodXNva21jbGNpd3Fib2pvbGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTc4NDYsImV4cCI6MjAyODQzMzg0Nn0.UHHsbJOho0tQj5UrZZ-nB_L0HRI-t2Tu735Hk_K0GNs");
export { supabase };
