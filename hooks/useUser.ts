import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

export const useUser = () => {
  const [user, loading, error] = useAuthState(auth())

  return {
    user,
    loading,
    error,
  }
}
