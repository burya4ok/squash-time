import { useContext } from 'react'
import { UserContext } from '../utils/user'

export const useUser = () => {
  const { user, loading, signOut, update } = useContext(UserContext)
  return {
    user,
    loading,
    signOut,
    update,
  }
}
