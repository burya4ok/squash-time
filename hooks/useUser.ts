import { useContext } from 'react'
import { UserContext } from '../utils/user'

export const useUser = () => {
  const { user, loading, signOut } = useContext(UserContext)
  return {
    user,
    signOut,
    loading,
  }
}
