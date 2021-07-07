import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useMemo, useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { google, outlook, office365, yahoo, ics, CalendarEvent } from 'calendar-link'

import { Layout, LayoutTheme } from '../../../components/layout'
import {
  faCalendar,
  faChevronDown,
  faChevronUp,
  faClock,
  faInfoCircle,
  faLocationArrow,
  faMoneyBill,
  faPen,
  faPhone,
  faPlus,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useTournamentInfo } from '../../../hooks/useTournamentInfo'
import { useUser } from '../../../hooks/useUser'
import classNames from 'classnames'
import { firestore } from '../../../utils/firebase'
import { format } from 'date-fns'
import { statusesOptions } from './edit'

const MAX_PARTICIPANTS_ICON = 5

const getCalendarLinks = (event) => [
  { title: 'add_to_calendar_google', link: google(event) },
  { title: 'add_to_calendar_outlook', link: outlook(event) },
  { title: 'add_to_calendar_office365', link: office365(event) },
  { title: 'add_to_calendar_yahoo', link: yahoo(event) },
]

export default function Tournament() {
  const [participantsOpen, setParticipantsOpen] = useState(false)
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

  const participantsWithIcons = useMemo(() => {
    const participantsWithIcons = []
    const participants = [...(tournament?.participants || [])]
    const currentUserIndex = participants.findIndex((p) => p.id === user?.id)

    if (~currentUserIndex) {
      participantsWithIcons.push(...participants.splice(currentUserIndex, 1))
      participantsWithIcons.push(...participants.slice(0, MAX_PARTICIPANTS_ICON - 1))
    } else {
      participantsWithIcons.push(...participants.slice(0, MAX_PARTICIPANTS_ICON))
    }

    return participantsWithIcons
  }, [tournament?.participants])

  const participantsFiltered = useMemo(() => {
    const participantsFiltered = []
    const participants = [...(tournament?.participants || [])]
    const currentUserIndex = participants.findIndex((p) => p.id === user?.id)

    if (~currentUserIndex) {
      participantsFiltered.push(...participants.splice(currentUserIndex, 1))
      participantsFiltered.push(...participants)
    } else {
      participantsFiltered.push(...participants)
    }

    return participantsFiltered
  }, [tournament?.participants])

  const restParticipants = useMemo(() => {
    const amountOfPerticipants = Number(tournament?.participants?.length)
    return amountOfPerticipants > MAX_PARTICIPANTS_ICON ? amountOfPerticipants - MAX_PARTICIPANTS_ICON : 0
  }, [tournament?.participants])

  const isFull = useMemo(() => {
    return Number(tournament?.participants_amount_max) === tournament?.participants?.length
  }, [tournament])

  const isEmpty = useMemo(() => {
    return tournament?.participants?.length === 0
  }, [tournament])

  const onParticipate = () => {
    if (!user) {
      router.push('/signin')
    } else {
      firestore()
        .doc(`tournaments/${router.query.id}`)
        .update({
          participants: firestore.FieldValue.arrayUnion(user.ref),
        })
    }
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

  const onPressParticipant = (participant) => (e) => {
    if (participant?.phone) {
      e.stopPropagation()
      window.open(`tel:${participant?.phone}`, '_self')
    }
  }

  const theme = useMemo(
    () => statusesOptions.find((s) => s.title === tournament?.status)?.theme || LayoutTheme.BLUE,
    [tournament],
  )

  const isAllowedToParticipate = useMemo(() => tournament?.status === 'not_started', [tournament])

  const calendarEvent = useMemo(
    (): CalendarEvent => ({
      title: tournament?.name,
      description: tournament?.description,
      location: tournament?.place,
      start: tournament?.date.toDate(),
      duration: [2, 'hours'],
    }),
    [tournament],
  )

  const calendarLinks = useMemo(() => getCalendarLinks(calendarEvent), [calendarEvent])

  const RightContent = () =>
    !isAllowedToParticipate ? null : (
      <span className="inline-flex shadow-sm rounded-md">
        <a
          href={ics(calendarEvent)}
          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200"
        >
          <FontAwesomeIcon icon={faCalendar} className="text-gray-400 mr-4" aria-hidden="true" />
          {t('add_to_calendar_default')}
        </a>
        <Menu as="span" className="-ml-px h-auto relative block">
          {({ open }) => (
            <>
              <Menu.Button className="relative h-full inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200">
                <span className="sr-only">Open options</span>
                <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right z-20 absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    {calendarLinks.map((item) => (
                      <Menu.Item key={item.title}>
                        {({ active }) => (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {t(item.title)}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </span>
    )

  return (
    <Layout title={tournament?.name} description={tournament?.description} RightContent={RightContent} theme={theme}>
      {loading || error || !tournament ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="bg-white px-4 py-5 border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 text-gray-600">{tournament?.description}</h3>
              </div>
              <div className="ml-2 mt-2 flex-shrink-0 sm:ml-4">
                {user?.isAdmin && (
                  <button
                    onClick={onEdit}
                    type="button"
                    className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <span className="h-5 w-4">
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                    <span className="hidden md:block ml-2 text-sm h-5">{t('edit')}</span>
                  </button>
                )}
                {isAllowedToParticipate ? (
                  isParticipant ? (
                    <button
                      onClick={onLeaveTournament}
                      type="button"
                      className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <span className="h-5 w-4">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </span>
                      <span className="hidden md:block ml-2 text-sm h-5">{t('leave')}</span>
                    </button>
                  ) : (
                    <button
                      onClick={onParticipate}
                      type="button"
                      disabled={isFull}
                      className={classNames(
                        'relative inline-flex items-center ml-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50',
                        { 'cursor-not-allowed hover:bg-green-700': isFull },
                      )}
                    >
                      <span className="h-5 w-4">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      <span className="hidden md:block ml-2 text-sm h-5">{t('join')}</span>
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className={`text-lg font-medium text-${theme}-500 flex space-x-2 pl-1`}>
                  <span className="h-5 w-4">
                    <FontAwesomeIcon icon={faInfoCircle} className={`text-${theme}-400`} aria-hidden="true" />
                  </span>
                  <span>{t('status')}</span>
                </dt>
                <dd className={`mt-1 text-lg font-medium text-${theme}-600 sm:mt-0 sm:col-span-2 pl-1`}>
                  {t(tournament.status)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-100 cursor-pointer">
                <dt className="text-sm font-medium text-green-500 flex space-x-2 pl-1">
                  <span className="h-5 w-4">
                    <FontAwesomeIcon icon={faUser} className="text-green-400" aria-hidden="true" />
                  </span>
                  <span>{t('participants')}</span>
                </dt>
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-start"
                  onClick={() => !isEmpty && setParticipantsOpen(!participantsOpen)}
                >
                  {!participantsOpen ? (
                    <div className="flex -space-x-2 relative z-0 overflow-hidden h-10 p-1">
                      {participantsWithIcons.map((participant) =>
                        participant?.picture ? (
                          <img
                            key={participant.id}
                            className={classNames(
                              'relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white',
                              user?.id === participant.id && 'border-2 border-green-500',
                            )}
                            src={participant?.picture}
                          />
                        ) : (
                          <div
                            key={participant.id}
                            className={classNames(
                              'bg-gray-300 relative z-30 h-8 w-8 rounded-full ring-2 ring-white justify-center items-center flex',
                              user?.id === participant.id && 'border-2 border-green-500',
                            )}
                          >
                            <FontAwesomeIcon icon={faUser} className="block h-6 w-6 text-gray-400" aria-hidden="true" />
                          </div>
                        ),
                      )}
                      {!!restParticipants && (
                        <div
                          className={classNames(
                            'bg-gray-200 relative z-30 h-8 w-8 rounded-full ring-2 ring-white justify-center items-center flex',
                          )}
                        >
                          <span className="flex text-base font-medium text-green-600">+{restParticipants}</span>
                        </div>
                      )}
                      {isEmpty && <span className="text-gray-400">{t('empty')}</span>}
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 p-1">
                      {participantsFiltered.map((participant) => (
                        <div
                          className="inline-flex items-center"
                          key={participant.id}
                          onClick={onPressParticipant(participant)}
                        >
                          {participant?.picture ? (
                            <img
                              className={classNames(
                                'relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white',
                                user?.id === participant.id && 'border-2 border-green-500',
                              )}
                              src={participant?.picture}
                            />
                          ) : (
                            <div
                              className={classNames(
                                'bg-gray-300 relative z-30 h-8 w-8 rounded-full ring-2 ring-white justify-center items-center flex',
                                user?.id === participant.id && 'border-2 border-green-500',
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faUser}
                                className="block h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                          <span
                            className={classNames(
                              'ml-2 text-base',
                              user?.id === participant.id ? 'text-green-400' : 'text-gray-500',
                            )}
                          >
                            {participant?.displayName}
                          </span>
                          {participant?.phone ? (
                            <span className="w-5 pl-2">
                              <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                  {!isEmpty && (
                    <span className="text-grey-200">
                      <FontAwesomeIcon
                        className="text-gray-500 text-lg"
                        icon={participantsOpen ? faChevronUp : faChevronDown}
                      />
                    </span>
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-indigo-500 flex space-x-2 pl-1">
                  <span className="h-5 w-4">
                    <FontAwesomeIcon icon={faClock} className="text-indigo-400" aria-hidden="true" />
                  </span>
                  <span>{t('time')}</span>
                </dt>
                <dd className="mt-1 text-sm font-medium text-indigo-600 sm:mt-0 sm:col-span-2 pl-1">
                  {format(new Date(tournament.date.toDate()), 'hh:mm')}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-indigo-500 flex space-x-2 pl-1">
                  <span className="h-5 w-4">
                    <FontAwesomeIcon icon={faCalendar} className="text-indigo-400" aria-hidden="true" />
                  </span>
                  <span>{t('date')}</span>
                </dt>
                <dd className="mt-1 text-sm font-medium text-indigo-600 sm:mt-0 sm:col-span-2 pl-1">
                  {format(new Date(tournament.date.toDate()), 'dd-MM-yyyy')}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-yellow-500 flex space-x-2 pl-1">
                  <span className="h-5 w-4">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-yellow-400" aria-hidden="true" />
                  </span>
                  <span>{t('price')}</span>
                </dt>
                <dd className="mt-1 text-sm font-medium text-yellow-600 sm:mt-0 sm:col-span-2 pl-1">
                  {tournament.price}₴
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-purple-500 flex space-x-2 pl-1">
                  <span className="h-5 w-4">
                    <FontAwesomeIcon icon={faLocationArrow} className="text-purple-400" aria-hidden="true" />
                  </span>
                  <span>{t('place')}</span>
                </dt>
                <dd className="mt-1 text-sm font-medium text-purple-600 sm:mt-0 sm:col-span-2 pl-1">
                  {tournament.place}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </Layout>
  )
}
