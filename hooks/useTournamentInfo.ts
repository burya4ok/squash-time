import { useEffect, useState } from 'react'
import { useDocumentData, useDocumentDataOnce, useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../utils/firebase'

const getRefData = async (player) => {
  return player.get().then((document) => ({ ...document.data(), id: player.id, ref: player }))
}

const getTournamentsData = async (value) => {
  const participants = await Promise.all(value.participants.map((p) => getRefData(p)))

  value.participants = participants

  return value
}

const getMatchesData = async (matches) => {
  return Promise.all(
    matches.map(async ({ id, ref, playerA, playerB, tournamentRef }) => {
      const playerAData = await getRefData(playerA)
      const playerBData = await getRefData(playerB)

      return {
        id,
        ref,
        playerA: playerAData,
        playerB: playerBData,
        tournamentRef,
      }
    }),
  )
}

export const useTournamentMatchInfo = (id: string | string[]) => {
  const [matches, setMatches] = useState(null)
  const [value, loading, error] = useCollectionData(
    firestore()
      .collection(`matches`)
      .where('tournamentRef', '==', firestore().doc(`tournaments/${id}`)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
      refField: 'ref',
      idField: 'id',
    },
  )

  useEffect(() => {
    if (value && !loading && !error) {
      getMatchesData(value).then((data) => setMatches(data))
    }
  }, [value, loading, error])

  return [matches, loading, error]
}

export const useTournamentInfo = (id: string | string[]) => {
  const [tournament, setTournament] = useState(null)
  const [value, loading, error] = useDocumentData(firestore().doc(`tournaments/${id}`), {
    snapshotListenOptions: { includeMetadataChanges: true },
    refField: 'ref',
  })

  useEffect(() => {
    if (value && !loading && !error) {
      getTournamentsData(value).then((data) => setTournament(data))
    }
  }, [value, loading, error])

  return [tournament, loading, error]
}

export const useTournamentInfoOnce = (id: string | string[]) => {
  const [tournament, setTournament] = useState(null)
  const [value, loading, error] = useDocumentDataOnce(firestore().doc(`tournaments/${id}`))

  useEffect(() => {
    if (value && !loading && !error) {
      getTournamentsData(value).then((data) => setTournament(data))
    }
  }, [value, loading, error])

  return [tournament, loading, error]
}
