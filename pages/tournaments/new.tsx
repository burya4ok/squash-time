import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Layout, LayoutTheme } from '../../components/layout'
import { firestore } from '../../utils/firebase'

type FormData = {
  participants_amount_max: number
  name: string
  place: string
  date: Date
}

export default function NewTournament() {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    firestore()
      .collection('tournaments')
      .add({
        ...values,
        date: firestore.FieldValue.serverTimestamp(),
        participants: [],
      })
  })

  const { t } = useTranslation('tournaments-new')

  return (
    <Layout title={t('title')} theme={LayoutTheme.GREEN}>
      <div className="mt-4 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{t('tournament_info')}</h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        {t('name')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('name')}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        {t('place')}
                      </label>
                      <input
                        type="text"
                        name="place"
                        id="place"
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('place')}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                        {t('participants_amount_max')}
                      </label>
                      <input
                        type="number"
                        name="participants_amount_max"
                        id="participants_amount_max"
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('participants_amount_max')}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}