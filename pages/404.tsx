import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

export default function NotFound() {
  const router = useRouter()

  const { t } = useTranslation('common')

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <Head>
        <title>{t('page_not_found_title')}</title>

        <meta name="title" content={t('page_not_found_title')} />
        <meta name="description" content={t('page_not_found_description')} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('page_not_found_title')} />
        <meta property="og:description" content={t('page_not_found_description')} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('page_not_found_title')} />
        <meta property="twitter:description" content={t('page_not_found_description')} />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">{t('page_not_found_404')}</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  {t('page_not_found_title')}
                </h1>
                <p className="mt-1 text-base text-gray-500">{t('page_not_found_description')}</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={goBack}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('go_back')}
                </button>
                <Link href="/tournaments">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {t('go_to_tournaments')}
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
