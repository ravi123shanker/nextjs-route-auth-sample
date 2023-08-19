"use client"
import { useEffect } from 'react'
import styles from '../page.module.css'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'

export default function SignOut() {
  const { auth } = useAuth()

  useEffect(() => {
    auth.signOut()
  }, [auth])
  return (
    <main className={styles.main}>
      <h1>Sign out Page</h1>
      <h3>You have been signed out:</h3>
      <p><Link href={"/"}>Back to home</Link></p>
    </main>
  )
}
