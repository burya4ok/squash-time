import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../utils/firebase'

export const useUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authUser, authLoading, error] = useAuthState(auth())
  useEffect(() => {
    if (authUser && !authLoading) {
      const docRef = firestore().collection('users').doc(authUser?.uid)

      docRef.get().then((userRef) => {
        const data = userRef.data()
        setUser({
          ...data,
          isAdmin: data.role === 'admin',
          isReferee: data.role === 'referee',
          id: docRef.id,
          ref: docRef,
        })
        setLoading(false)
      })
    }
  }, [authUser, loading])

  return {
    user,
    loading,
    error,
  }
}
