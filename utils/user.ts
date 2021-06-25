import { auth, firestore } from './firebase'

export const checkUser = (user) => {
  //after we have the credential - lets check if the user exists in firestore
  const docRef = firestore().collection('users').doc(auth().currentUser.uid)

  docRef.get().then((doc) => {
    if (doc.exists) {
      //user exists then just update the login time
      return user
    } else {
      //user doesn't exist - create a new user in firestore
      return addNewUserToFirestore(user)
    }
  })
}

export const addNewUserToFirestore = (user) => {
  const collection = firestore().collection('users')
  const details = {
    displayName: user.user.displayName,
    email: user.user.email,
    picture: user.user.photoURL,
    role: 'player',
  }
  collection.doc(auth().currentUser.uid).set(details)
  return { user, details }
}
