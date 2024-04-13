import * as dotenv from 'dotenv';
import { createBrowserClient } from "@supabase/ssr";

dotenv.config()

export function createClient() {
    //Create a supabase client on the browser with the project's credentials
    return createBrowserClient(
        process.env.SUPABASE_PROJECT_URL!,
        process.env.SUPABASE_ANON_URL!
    )
}