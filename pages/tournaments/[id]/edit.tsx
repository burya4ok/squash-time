import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Dialog, Transition } from '@headlessui/react'

import { Layout, LayoutTheme } from '../../../components/layout'
import { useTournamentInfoOnce } from '../../../hooks/useTournamentInfo'
import { combineDateAndTime } from '../../../utils/datetime'
import { firestore } from '../../../utils/firebase'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type FormData = {
  participants_amount_max: number
  name: string
  place: string
  description: string
  price: number
  date: string
  time: string
}

export default function EditTournament() {
  const router = useRouter()

  const [deletionOpen, setDeletionOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  const [tournament, loading, error] = useTournamentInfoOnce(router.query.id)
  const { register, handleSubmit, reset } = useForm<FormData>()

  useEffect(() => {
    if (tournament && !loading && !error) {
      const date = format(new Date(tournament.date.toDate()), 'yyyy-dd-MM')
      const time = format(new Date(tournament.date.toDate()), 'hh:mm')
      reset({ ...tournament, date, time })
    }
  }, [tournament, loading, error])

  const onSubmit = handleSubmit(({ date, time, ...values }) => {
    firestore()
      .doc(`tournaments/${router.query.id}`)
      .update({
        ...values,
        date: firestore.Timestamp.fromDate(combineDateAndTime(date, time)),
        participants: [],
      })
      .then(() => {
        router.push(`/tournaments/${router.query.id}`)
      })
      .catch(() => {
        router.push('/tournaments')
      })
  })

  const onDelete = () => {
    setDeletionOpen(true)
  }

  const onConfirmDelete = () => {
    firestore()
      .doc(`tournaments/${router.query.id}`)
      .delete()
      .finally(() => {
        setDeletionOpen(false)
        router.push('/tournaments')
      })
  }

  const { t } = useTranslation('tournament-form')

  return (
    <Layout title={t('title_edit')} theme={LayoutTheme.YELLOW}>
      {loading || error || !tournament ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{t('tournament_info')}</h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={onSubmit}>
                <div className="sm:shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          {t('name')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('name')}
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          {t('description')}
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            required
                            defaultValue={''}
                            {...register('description')}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{t('description_details')}</p>
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                          {t('place')}
                        </label>
                        <input
                          type="text"
                          name="place"
                          id="place"
                          required
                          className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('place')}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          {t('date')}
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          required
                          className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('date')}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                          {t('time')}
                        </label>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          required
                          className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('time')}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="participants_amount_max" className="block text-sm font-medium text-gray-700">
                          {t('participants_amount_max')}
                        </label>
                        <input
                          type="number"
                          name="participants_amount_max"
                          id="participants_amount_max"
                          required
                          className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('participants_amount_max')}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          {t('price')}
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">₴</span>
                          </div>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            required
                            aria-describedby="price-currency"
                            {...register('price')}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                              {t('currency')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      onClick={onDelete}
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-4"
                    >
                      {t('delete')}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      {t('edit')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Transition.Root show={deletionOpen} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              open={deletionOpen}
              onClose={setDeletionOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FontAwesomeIcon
                          icon={faExclamationTriangle}
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          {t('deletion_title')}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{t('deletion_description')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onConfirmDelete}
                      >
                        {t('deletion_button_confirm')}
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setDeletionOpen(false)}
                        ref={cancelButtonRef}
                      >
                        {t('deletion_button_cancel')}
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
    </Layout>
  )
}