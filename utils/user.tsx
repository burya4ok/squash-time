import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'

export const UserContext = React.createContext({
  user: null,
  loading: false,
  checkOrCreateUser: (user: any) => null,
  signOut: () => undefined,
})

export const UserProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [authUser, authLoading] = useAuthState(auth())
  const router = useRouter()

  useEffect(() => {
    console.log(authUser)
    if (authUser && !authLoading) {
      const docRef = firestore().collection('users').doc(authUser?.uid)

      docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data()
          setUser({
            ...data,
            isAdmin: data.role === 'admin',
            isReferee: data.role === 'referee',
            id: docRef.id,
            ref: docRef,
          })
          setLoading(false)
        }
      })
    }
  }, [authUser, loading])

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
    console.log(user)
    //after we have the credential - lets check if the user exists in firestore
    const docRef = firestore().collection('users').doc(authUser?.uid)

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
        console.log(u)
        setUser(u)
        setLoading(false)
      })
  }

  const signOut = () => {
    setUser(null)
    router.push('/signin')
    auth().signOut()
  }

  return <UserContext.Provider value={{ user, loading, checkOrCreateUser, signOut }}>{children}</UserContext.Provider>
}
