import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { Layout, LayoutTheme } from '../../components/layout'
import { format } from 'date-fns'
import {
  faCalendar,
  faClock,
  faLocationArrow,
  faMapPin,
  faMoneyBill,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { firestore } from '../../utils/firebase'
import { useUser } from '../../hooks/useUser'

export default function Tournaments() {
  const { t } = useTranslation('tournaments')

  const { user } = useUser()

  const [value, loading, error] = useCollectionData(firestore().collection('tournaments'), {
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: 'id',
  })

  const createButton = () => {
    if (!user?.isAdmin) {
      return null
    }
    return (
      <Link href="/tournaments/new">
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-green-500 bg-white hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
        >
          <span className="-ml-0.5 mr-2 h-4 w-4">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="text-sm">{t('create')}</span>
        </button>
      </Link>
    )
  }

  return (
    <Layout title={t('title')} RightContent={createButton} theme={LayoutTheme.GREEN}>
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
                <h3 className="text-xl font-medium mb-2 mr-7">
                  <Link href={`tournaments/${tournament.id}`}>
                    <a className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tournament.name}
                    </a>
                  </Link>
                </h3>
                <h2 className="text-gray-500 mb-2 mr-7">{tournament.description}</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="h-5 w-5">
                      <FontAwesomeIcon icon={faUser} className="text-green-500" aria-hidden="true" />
                    </span>
                    <span className="text-green-700 text-sm font-medium">
                      {tournament.participants.length} / {tournament.participants_amount_max}
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="h-5 w-5">
                      <FontAwesomeIcon icon={faMoneyBill} className="text-yellow-400" aria-hidden="true" />
                    </span>
                    <span className="text-yellow-600 text-sm font-medium">{tournament.price}₴</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="h-5 w-5">
                      <FontAwesomeIcon icon={faClock} className="text-indigo-400" aria-hidden="true" />
                    </span>
                    <span className="text-indigo-600 text-sm font-medium">
                      {format(new Date(tournament.date.toDate()), 'hh:mm')}
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="h-5 w-5">
                      <FontAwesomeIcon icon={faCalendar} className="text-indigo-400" aria-hidden="true" />
                    </span>
                    <span className="text-indigo-600 text-sm font-medium">
                      {format(new Date(tournament.date.toDate()), 'dd-MM-yyyy')}
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="h-5 w-5">
                      <FontAwesomeIcon icon={faLocationArrow} className="text-purple-400" aria-hidden="true" />
                    </span>
                    <span className="text-purple-600 text-sm font-medium">{tournament.place}</span>
                  </div>
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
