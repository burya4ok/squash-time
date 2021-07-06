import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'

export const UserContext = React.createContext({
  user: null,
  loading: false,
  checkOrCreateUser: (user: any) => null,
  signOut: () => undefined,
  update: (user: any) => undefined,
})

export const ALLOWED_ROUTES = ['/signin', '/signup', '/', '/tournaments']

export const UserProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authUser, authLoading] = useAuthState(auth())
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && !authUser && !ALLOWED_ROUTES.includes(router.pathname)) {
      router.push('/signin')
    }
  }, [loading, user, authUser, router.pathname])

  useEffect(() => {
    if (!authLoading && !authUser && !user) {
      setLoading(false)
    }
  }, [authUser, user, authLoading])

  useEffect(() => {
    if (authUser && !authLoading) {
      setLoading(true)
      const docRef = firestore().collection('users').doc(authUser?.uid)

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data()
            setUser({
              ...data,
              isAdmin: data.role === 'admin',
              isReferee: data.role === 'referee',
              id: docRef.id,
              ref: docRef,
            })
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [authUser, authLoading])

  const addNewUserToFirestore = (user: any) => {
    const collection = firestore().collection('users')
    const details = {
      displayName: user.user.displayName,
      email: user.user.email,
      picture: user.user.photoURL,
      role: 'player',
    }
    return collection
      .doc(auth().currentUser.uid)
      .set(details)
      .then(() => details)
  }

  const checkOrCreateUser = (user: any) => {
    setLoading(true)
    //after we have the credential - lets check if the user exists in firestore
    const docRef = firestore().collection('users').doc(auth().currentUser.uid)

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          //user exists then just update the login time
          return doc.data()
        } else {
          //user doesn't exist - create a new user in firestore
          return addNewUserToFirestore(user)
        }
      })
      .then((u) => {
        setUser({ ...u, id: docRef.id, ref: docRef })
        setLoading(false)
      })
  }

  const signOut = () => {
    setLoading(true)
    setUser(null)
    router.push('/signin')
    auth()
      .signOut()
      .then(() => {
        setLoading(false)
      })
  }

  const update = (details) => {
    const docRef = firestore().doc(`users/${user?.id}`)
    docRef.update(details).then(() => setUser({ ...details, id: docRef.id, ref: docRef }))
  }

  return (
    <UserContext.Provider value={{ user, loading, checkOrCreateUser, signOut, update }}>
      {children}
    </UserContext.Provider>
  )
}
