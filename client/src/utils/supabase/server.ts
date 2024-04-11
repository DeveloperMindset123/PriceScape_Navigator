import * as dotenv from 'dotenv';
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

dotenv.config()

export function createClient() {
    const cookieStore = cookies()

    // Create a server's supabase client with newly configured cookie,
    // which could be used to maintain user's session
    return createServerClient(
        process.env.SUPABASE_PROJECT_URL!,
        process.env.SUPABASE_ANON_URL!,
        {
            cookies : {
                get(name:string) {
                    return cookieStore.get(name)?.value
                },
                set(name:string, value:string, options:CookieOptions) {
                    try {
                        cookieStore.set({name, value, ...options})
                    } catch (error) {
                        //The set method was called from a server component
                        //This can be ignored if you have a middleware refreshing 
                        //user sessions
                    }
                },
                remove(name:string, options:CookieOptions) {
                    try {
                        cookieStore.set({name, value:'', ...options})
                    } catch (error) {
                        //The delete method was called from a server component
                        //This can be ignored if you have a middleware refershing
                        //user sessions
                    }
                },
            },
        }

    )
    
}

