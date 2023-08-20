import { useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }) {
    const { user, initializing, setRedirect } = useAuth()
    const router = useRouter()
    const pathname=usePathname();
  
    useEffect(() => {
      if (!initializing) {
        //auth is initialized and there is no user
        if (!user) {
          // remember the page that user tried to access
          setRedirect(pathname)
          router.push("/signin")
        }
      }
    }, [initializing, router, user, setRedirect])
  
    /* show loading indicator while the auth provider is still initializing */
    if (initializing) {
      return <h1>Application Loading</h1>
    }
  
    // if auth initialized with a valid user show protected page
    if (!initializing && user) {
      return <>{children}</>
    }
  
    /* otherwise don't return anything, will do a redirect from useEffect */
    return null
  }