"use client"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { User } from "lucide-react"
 
export function LogoutButton() {
  return <Button onClick={() => signOut()} variant={"secondary"} >
    
        <User className="mr-2 h-4 w-4" />
    Logout</Button>
}