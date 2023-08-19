"use client"
import useAuth from "@/hooks/useAuth"
import styles from '../app/page.module.css'
import Link from "next/link"


export function UserStatus() {
    const auth = useAuth()
  
    return (
      <div className={styles.user}>
        <p>
          <strong>User status: {auth.user ? "Signed in" : "Not signed in"}</strong>
        </p>
        <div>
          {auth.user ? (
            <div>
              <p>name: {auth.user.name}</p>
              <p>email: {auth.user.email}</p>
              <p><Link href={"/signout"}>Sign Out</Link></p>
            </div>
          ) : <Link href={"/signin"}>Sign In</Link>}
        </div>
      </div>
    )
  }