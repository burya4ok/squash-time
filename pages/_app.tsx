import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import 'tailwindcss/tailwind.css'
import { useUser } from '../hooks/useUser'
import { UserProvider } from '../utils/user'

const LOGIN_ROUTES = ['/signin', '/signup', '/']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { user, loading } = useUser()

  useEffect(() => {
    if (!loading && !user && !LOGIN_ROUTES.includes(router.pathname)) {
      router.push('/signin')
    }
  }, [loading, user])

  if (loading && !LOGIN_ROUTES.includes(router.pathname)) {
    return <div>Loading...</div>
  }

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
