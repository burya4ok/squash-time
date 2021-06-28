import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'

import 'tailwindcss/tailwind.css'
import { useUser } from '../hooks/useUser'
import { LOGIN_ROUTES, UserProvider } from '../utils/user'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { loading } = useUser()

  if (loading && !LOGIN_ROUTES.includes(router.pathname)) {
    return <div>Loading...</div>
  }

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
