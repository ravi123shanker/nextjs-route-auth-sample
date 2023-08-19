"use client"
import { UserStatus } from '@/components/UserStatus'
import styles from '../page.module.css'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

const defaultEmail = "admin@example.com"
const defaultPassword = "admin123"

export default function SignIn() {
  const { auth, initializing, getRedirect, clearRedirect, user, error } =
    useAuth()
  const [email, setEmail] = useState(defaultEmail)
  const [pswd, setPswd] = useState(defaultPassword)
  const [signInInProgress, setInProgress] = useState(false)
  const mounted = useRef()
  const router = useRouter()

  /* Guard if page is navigated away while sign in process is still active */
  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!initializing) {
      if (user) {
        const redirect = getRedirect()
        console.log("redirect: ", redirect)
        if (redirect !== null) {
          router.push(redirect) // go to page which redirected to login
          clearRedirect()
        } else {
          router.back() // go to previous page
        }
      }
    }
  }, [router, getRedirect, clearRedirect, initializing, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && pswd) {
      try {
        setInProgress(true)
        await auth.signIn(email, pswd, 2000)
      } catch (error) {
        if (mounted.current) {
          setInProgress(false)
        }
      }
    } else {
      console.log("email or password is empty")
    }
  }

  const handleEmail = function (e) {
    setEmail(e.currentTarget.value)
  }
  const handlePswd = function (e) {
    setPswd(e.currentTarget.value)
  }

  if (initializing) {
    return <h1>Application Loading </h1>
  }
  if (signInInProgress) {
    return <h1>Signing in progress</h1>
  }
  return (
    <main className={styles.main}>
      <h1>Sign in Page</h1>
      <h3>This page is accessible to everyone.</h3>
      <UserStatus />
      {!user ? ( // there is no user, show sign in form
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={handleEmail} />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                required
                value={pswd}
                onChange={handlePswd}
              />
            </label>
            <input type="submit" required value="Submit" />
          </form>
          {error ? (
            <div>
              <p>Sign in error:</p>
              <p>{error.message}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </main>
  )
}
