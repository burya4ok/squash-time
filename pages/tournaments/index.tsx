import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useMemo, Fragment, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Dialog, Transition } from '@headlessui/react'
import isEqual from 'lodash.isequal'

import { Layout, LayoutTheme } from '../../components/layout'
import { format, compareAsc, compareDesc } from 'date-fns'
import {
  faCalendar,
  faClock,
  faFilter,
  faInfoCircle,
  faLocationArrow,
  faMoneyBill,
  faPlus,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { firestore } from '../../utils/firebase'
import { useUser } from '../../hooks/useUser'
import { statusesOptions } from './[id]/edit'
import { CATEGORIES, CategoriesBadges } from '../../components/common/CategoriesBadges'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

type FiltersProps = {
  name: string
  categories: string[]
  place: string
  start_date: string
  end_date: string
}

const DEFAULT_FILTERS = {
  name: '',
  categories: ['m3', 'm2', 'm1', 'pro'],
  place: '',
  start_date: '',
  end_date: '',
}

export default function Tournaments() {
  const { t } = useTranslation('tournaments')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FiltersProps>(DEFAULT_FILTERS)

  const isFiltersApplied = useMemo(() => !isEqual(filters, DEFAULT_FILTERS), [filters])

  const { reset, setValue, getValues, watch, register } = useForm<FiltersProps>({ defaultValues: DEFAULT_FILTERS })
  const [tournament_categories, tournament_start_date, tournament_end_date] = watch([
    'categories',
    'start_date',
    'end_date',
  ])

  const { user } = useUser()

  const tournamentsCollection = useMemo(() => {
    return user?.isAdmin
      ? firestore().collection('tournaments').orderBy('date', 'asc')
      : firestore().collection('tournaments').where('date', '>=', new Date()).orderBy('date', 'asc')
  }, [user])

  const [tornaments, loading, error] = useCollectionData(tournamentsCollection, {
    snapshotListenOptions: { includeMetadataChanges: true },
    idField: 'id',
  })

  const filterdTournaments = useMemo(() => {
    if (!tornaments) return null

    let filtered = [...tornaments]

    const { name, place, categories, start_date, end_date } = filters

    if (name) {
      filtered = filtered.filter((t) => t.name?.includes(name))
    }

    if (!isEqual(categories, DEFAULT_FILTERS.categories)) {
      const notEmptyCategories = categories.filter((c) => !!c)
      filtered = filtered.filter((t) => (t.categories || []).some((c) => notEmptyCategories.includes(c)))
    }

    if (place) {
      filtered = filtered.filter((t) => t.place?.includes(place))
    }

    if (start_date) {
      console.log(start_date)
      filtered = filtered.filter((t) => compareDesc(new Date(start_date), t.date.toDate()) === 1)
    }

    if (end_date) {
      filtered = filtered.filter((t) => compareAsc(t.date.toDate(), new Date(end_date)) === -1)
    }

    return filtered
  }, [tornaments, filters])

  const createButton = () => {
    return (
      <div className="flex flex-col md:flex-row items-end">
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className={classNames(
            'px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-smhover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500',
            isFiltersApplied ? 'text-white bg-yellow-500 ' : 'text-yellow-500 bg-white ',
          )}
        >
          <span className="-ml-0.5 mr-2 h-4 w-4">
            <FontAwesomeIcon icon={faFilter} />
          </span>
          <span className="text-sm">{t('filters')}</span>
        </button>
        {user?.isAdmin && (
          <Link href="/tournaments/new">
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 ml-4 mt-4 md:mt-0 border border-transparent text-xs font-medium rounded shadow-sm text-green-500 bg-white hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
            >
              <span className="-ml-0.5 mr-2 h-4 w-4">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="text-sm">{t('create')}</span>
            </button>
          </Link>
        )}
      </div>
    )
  }

  const onChangeCategories = useCallback(
    (value: string) => {
      const newCategories = [...tournament_categories]
      const index = CATEGORIES.findIndex((c) => c.value === value)

      if (newCategories[index]) {
        newCategories[index] = ''
      } else {
        newCategories[index] = value
      }

      setValue('categories', newCategories)
    },
    [tournament_categories],
  )

  const onSubmitFilters = useCallback(() => {
    setFilterOpen(false)
    setFilters(getValues())
  }, [getValues])

  const onResetFilters = useCallback(() => {
    setFilterOpen(false)
    reset(DEFAULT_FILTERS)
    setFilters(DEFAULT_FILTERS)
  }, [reset])

  return (
    <Layout title={t('title')} RightContent={createButton} theme={LayoutTheme.GREEN}>
      {loading || error ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-hidden divide-y divide-gray-200 md:divide-y-0 md:grid md:grid-cols-2">
          {!filterdTournaments?.length && <div>{t('no_tournaments')}</div>}
          {filterdTournaments?.map((tournament) => {
            const statusTheme = statusesOptions.find((s) => s.title === tournament?.status)?.theme || LayoutTheme.GRAY

            return (
              <div
                key={tournament.id}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500"
              >
                <Link href={`tournaments/${tournament.id}`}>
                  <a className="focus:outline-none">
                    <h3 className="text-xl font-medium mr-7">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tournament.name}
                    </h3>
                    <CategoriesBadges categories={tournament?.categories} />
                    <h2 className="text-gray-500 my-1 mr-7">{tournament.description}</h2>
                    <div className="grid grid-cols-2">
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="h-6 w-5">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className={`text-${statusTheme}-500`}
                            aria-hidden="true"
                          />
                        </span>
                        <span className={`text-${statusTheme}-700 text-base font-medium`}>{t(tournament.status)}</span>
                      </div>
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="h-6 w-5">
                          <FontAwesomeIcon icon={faUser} className="text-green-500" aria-hidden="true" />
                        </span>
                        <span className="text-green-700 text-sm font-medium">
                          {tournament.participants.length} / {tournament.participants_amount_max}
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="h-5 w-5">
                          <FontAwesomeIcon icon={faClock} className="text-indigo-400" aria-hidden="true" />
                        </span>
                        <span className="text-indigo-600 text-sm font-medium">
                          {format(new Date(tournament.date.toDate()), 'hh:mm')}
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="h-5 w-5">
                          <FontAwesomeIcon icon={faCalendar} className="text-indigo-400" aria-hidden="true" />
                        </span>
                        <span className="text-indigo-600 text-sm font-medium">
                          {format(new Date(tournament.date.toDate()), 'dd-MM-yyyy')}
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="h-5 w-5">
                          <FontAwesomeIcon icon={faMoneyBill} className="text-yellow-400" aria-hidden="true" />
                        </span>
                        <span className="text-yellow-600 text-sm font-medium">{tournament.price}₴</span>
                      </div>
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="h-5 w-5">
                          <FontAwesomeIcon icon={faLocationArrow} className="text-purple-400" aria-hidden="true" />
                        </span>
                        <span className="text-purple-600 text-sm font-medium">{tournament.place}</span>
                      </div>
                    </div>
                  </a>
                </Link>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            )
          })}
        </div>
      )}
      <Transition.Root show={filterOpen} as={Fragment}>
        <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={filterOpen} onClose={setFilterOpen}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-2xl">
                  <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1">
                      <div className="px-4 py-6 bg-gray-200 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-800">
                              {t('filters_title')}
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">{t('filters_description')}</p>
                          </div>
                          <div className="h-7 flex items-center">
                            <button
                              type="button"
                              className="h-6 w-6 bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              onClick={() => setFilterOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <FontAwesomeIcon icon={faTimes} className="" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="py-3 space-y-3 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="tournament_name"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              {t('filters_tournament_name')}
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="tournament_name"
                              id="tournament_name"
                              className="block w-full h-10 shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                              {...register('name')}
                            />
                          </div>
                        </div>

                        <div className="py-3 space-y-3 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="tournament_place"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                {t('filters_tournament_place')}
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                name="tournament_place"
                                id="tournament_place"
                                className="block w-full h-10 shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                                {...register('place')}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="py-3 space-y-3 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="tournament_start_date"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                {t('filters_tournament_start_date')}
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="date"
                                max={tournament_end_date}
                                name="tournament_start_date"
                                id="tournament_start_date"
                                className="block w-full h-10 shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                                {...register('start_date')}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="py-3 space-y-3 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="tournament_end_date"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                {t('filters_tournament_end_date')}
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="date"
                                min={tournament_start_date}
                                name="tournament_end_date"
                                id="tournament_end_date"
                                className="block w-full h-10 shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                                {...register('end_date')}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="py-3 space-y-3 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                            {t('filters_tournament_categories')}
                          </label>
                          <span className="relative z-0 mt-1 inline-flex shadow-sm rounded-md" id="categories">
                            {CATEGORIES.map((category, i) => (
                              <button
                                key={category.title}
                                type="button"
                                onClick={() => onChangeCategories(category.value)}
                                className={classNames(
                                  `relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium  focus:z-10 focus:outline-none focus:ring-1 focus:ring-${category.theme}-500 focus:border-${category.theme}-500`,
                                  i === CATEGORIES.length - 1 && 'rounded-r-md',
                                  i === 0 && 'rounded-l-md',
                                  tournament_categories.includes(category.value)
                                    ? `bg-${category.theme}-500 focus:bg-${category.theme}-500 hover:bg-${category.theme}-400 text-white`
                                    : 'text-gray-700 bg-white hover:bg-gray-50',
                                )}
                              >
                                {t(category.title)}
                              </button>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          onClick={onResetFilters}
                        >
                          {t('filters_reset')}
                        </button>
                        <button
                          type="button"
                          onClick={onSubmitFilters}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {t('filters_apply')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Layout>
  )
}
