"use client";
import { IoLogOutOutline } from "react-icons/io5";
import { supabase } from "@/utils/supabase/client";
import React from "react";
import { useRouter } from "next/navigation";
import ThemeSwitch from "../themeSwitch";

const Logout = () => {
    const router = useRouter();
    const useSignOutCurrentUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error logging out: ", error);
        } else {
            console.log("User logged out successfully");
            //router.back() allows us to navigate back to the previous route in the browser's history stack
            router.back();
        }
    }
  return (
    <div><IoLogOutOutline className="w-12 h-12 rounded-full dark:bg-slate-600 pl-2 pt-1 pb-1 hover:pointer bg-slate-200 mr-[-20px]" onClick={useSignOutCurrentUser} /></div>
  )
}

export default Logout