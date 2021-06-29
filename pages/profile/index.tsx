import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Layout } from '../../components/layout'
import { useUser } from '../../hooks/useUser'
import { firestore } from '../../utils/firebase'

type FormData = {
  displayName: string
  phone: string
  email: string
  picture: string
}

export default function Profile() {
  const router = useRouter()
  const { user, loading } = useUser()

  const { register, handleSubmit, reset } = useForm<FormData>()

  useEffect(() => {
    if (user && !loading) {
      reset({
        displayName: user.displayName,
        phone: user.phone,
        email: user.email,
        picture: user.picture,
      })
    }
  }, [user, loading])

  const onSubmit = handleSubmit((values) => {
    firestore().doc(`users/${user?.id}`).update(values)
  })

  const { t } = useTranslation('profile')

  return (
    <Layout title={t('title')}>
      {loading || !user ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{t('info')}</h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={onSubmit}>
                <div className="sm:shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                          {t('displayName')}
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          id="displayName"
                          required
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('displayName')}
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          {t('email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('email')}
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          {t('phone')}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            +38
                          </span>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                            placeholder="000-000-00-00"
                            {...register('phone')}

                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t('update')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
