import { useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { firestore } from './firebase'

export const useTournamentInfo = (id: string | string[]) => {
  const [tournament, setTournament] = useState(null)
  const [value, loading, error] = useDocumentData(firestore().doc(`tournaments/${id}`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  useEffect(() => {
    if (value && !loading && !error) {
      Promise.all(
        value.participants.map((p) => (typeof p === 'string' ? p : p.get().then((d) => ({ ...d.data(), id: p.id })))),
      ).then((participants) => {
        value.participants = participants

        setTournament(value)
      })
    }
  }, [value, loading, error])

  return [tournament, loading, error]
}
