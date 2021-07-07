import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

import { Layout, LayoutTheme } from '../../../components/layout'
import { useTournamentMatchInfo, useTournamentInfo } from '../../../hooks/useTournamentInfo'
import { useUser } from '../../../hooks/useUser'

export default function Tournament() {
  const router = useRouter()
  const { t } = useTranslation('tournaments')
  const { user } = useUser()

  const [tournament] = useTournamentInfo(router.query.id)
  const [matches, loading, error] = useTournamentMatchInfo(router.query.id)

  console.log(matches)

  return (
    <Layout title={tournament?.name} description={tournament?.description} theme={LayoutTheme.GREEN}>
      {loading || error || !matches ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-lg overflow-hidden divide-y divide-gray-200 md:divide-y-0 md:grid md:grid-cols-2">
          {matches.map((match) => (
            <div
              key={match.id}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500"
            >
              <h3 className="text-xl font-medium mb-2 mr-7">
                <Link href={`tournaments/${tournament.id}`}>
                  <a className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {match.playerA.displayName} - {match.playerB.displayName}
                  </a>
                </Link>
              </h3>

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
