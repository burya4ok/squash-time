import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { Layout, LayoutTheme } from '../../components/layout'
import { format } from 'date-fns'
import { faCalendar, faMapPin, faUser } from '@fortawesome/free-solid-svg-icons'
import { firestore } from '../../utils/firebase'

export default function Tournaments() {
  const { t } = useTranslation('tournaments')

  const [value, loading, error] = useCollectionData(firestore().collection('tournaments'), {
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: 'id',
  })

  return (
    <Layout title={t('title')} theme={LayoutTheme.GREEN}>
      {loading || error ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-lg overflow-hidden divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2">
          {value?.map((tournament) => (
            <div
              key={tournament.id}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <div>
                <h3 className="text-xl font-medium mb-2">
                  <Link href={`tournaments/${tournament.id}`}>
                    <a className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tournament.name}
                    </a>
                  </Link>
                </h3>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-green-500" aria-hidden="true" />
                  <span className="text-green-700 text-sm font-medium">
                    {tournament.participants.length} / {tournament.participants_amount_max}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-gray-900 text-sm font-medium">
                    {format(new Date(tournament.date.toDate()), 'hh:mm dd-MM-yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faMapPin} className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-gray-900 text-sm font-medium">{tournament.place}</span>
                </div>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
