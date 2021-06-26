import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Layout, LayoutTheme } from '../../../components/layout'
import { faEdit, faPlus, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { useTournamentInfo } from '../../../hooks/useTournamentInfo'
import { useUser } from '../../../hooks/useUser'
import classNames from 'classnames'
import { firestore } from '../../../utils/firebase'

export default function Tournament() {
  const router = useRouter()
  const { t } = useTranslation('tournaments')
  const { user } = useUser()

  const [tournament, loading, error] = useTournamentInfo(router.query.id)

  const isParticipant = useMemo(() => {
    if (!user || !tournament) {
      return false
    }

    return !!tournament.participants.find((p) => p.id === user.id)
  }, [user, tournament])

  const onParticipate = () => {
    firestore()
      .doc(`tournaments/${router.query.id}`)
      .update({
        participants: firestore.FieldValue.arrayUnion(user.ref),
      })
  }

  const onEdit = () => {
    router.push(`/tournaments/${router.query.id}/edit`)
  }

  const onLeaveTournament = () => {
    firestore()
      .doc(`tournaments/${router.query.id}`)
      .update({
        participants: firestore.FieldValue.arrayRemove(user.ref),
      })
  }

  return (
    <Layout title={tournament?.name} hideTitle theme={LayoutTheme.GREEN}>
      {loading || error || !tournament ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{tournament?.name}</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                {user.isAdmin && (
                  <button
                    onClick={onEdit}
                    type="button"
                    className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                    <span className="hidden md:block ml-2">{t('edit')}</span>
                  </button>
                )}
                {isParticipant ? (
                  <button
                    onClick={onLeaveTournament}
                    type="button"
                    className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                    <span className="hidden md:block ml-2">{t('leave')}</span>
                  </button>
                ) : (
                  <button
                    onClick={onParticipate}
                    type="button"
                    className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                    <span className="hidden md:block ml-2">{t('join')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex -space-x-2 m-4 relative z-0 overflow-hidden">
            {tournament.participants.map((participant) =>
              participant?.picture ? (
                <img
                  key={participant.id}
                  className={classNames(
                    'relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white',
                    user.id === participant.id && 'border-2 border-red-500',
                  )}
                  src={participant?.picture}
                  alt=""
                />
              ) : (
                <div
                  key={participant.id}
                  className={classNames(
                    'bg-gray-300 relative z-30 h-8 w-8 rounded-full ring-2 ring-white  justify-center items-center flex',
                    user.id === participant.id && 'border-2 border-red-500',
                  )}
                >
                  <FontAwesomeIcon icon={faUser} className="block h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}
