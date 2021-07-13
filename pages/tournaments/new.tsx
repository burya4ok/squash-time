import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CATEGORIES } from '../../components/common/CategoriesBadges'

import { Layout, LayoutTheme } from '../../components/layout'
import { combineDateAndTime } from '../../utils/datetime'
import { firestore } from '../../utils/firebase'

type FormData = {
  participants_amount_max: number
  name: string
  place: string
  description: string
  price: number
  date: string
  time: string
  status: string
  courts_amount: number
  categories: string[]
}

export default function NewTournament() {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = handleSubmit(({ date, time, ...values }) => {
    firestore()
      .collection('tournaments')
      .add({
        ...values,
        date: firestore.Timestamp.fromDate(combineDateAndTime(date, time)),
        status: 'not_started',
        participants: [],
      })
      .then((doc) => {
        router.push(`/tournaments/${doc.id}`)
      })
      .catch(() => {
        router.push('/tournaments')
      })
  })

  const { t } = useTranslation('tournament-form')

  const [categories, setCategories] = useState(['', '', '', ''])

  const onChangeCategories = useCallback(
    (value: string) => {
      const newCategories = [...categories]
      const index = CATEGORIES.findIndex((c) => c.value === value)

      if (newCategories[index]) {
        newCategories[index] = ''
      } else {
        newCategories[index] = value
      }

      setCategories(newCategories)
      setValue('categories', newCategories)
    },
    [categories],
  )

  return (
    <Layout title={t('title_create')} theme={LayoutTheme.GREEN}>
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
                        className="mt-1 h-10 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          required
                          defaultValue={''}
                          {...register('description')}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{t('description_details')}</p>
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                        {t('categories')}
                      </label>
                      <span className="relative z-0 mt-1 inline-flex shadow-sm rounded-md" id="categories">
                        {CATEGORIES.map((category, i) => (
                          <button
                            key={category.title}
                            type="button"
                            onClick={() => onChangeCategories(category.value)}
                            className={classNames(
                              `relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-${category.theme}-500 focus:border-${category.theme}-500`,
                              i === CATEGORIES.length - 1 && 'rounded-r-md',
                              i === 0 && 'rounded-l-md',
                              categories.includes(category.value)
                                ? `bg-${category.theme}-500 focus:bg-${category.theme}-500 text-white`
                                : 'text-gray-700',
                            )}
                          >
                            {t(category.title)}
                          </button>
                        ))}
                      </span>
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
                        className="mt-1 h-10 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('participants_amount_max')}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="courts_amount" className="block text-sm font-medium text-gray-700">
                        {t('courts_amount')}
                      </label>
                      <input
                        type="number"
                        name="courts_amount"
                        id="courts_amount"
                        required
                        className="mt-1 h-10 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('courts_amount')}
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
                        className="mt-1 h-10 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('time')}
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
                        className="mt-1 h-10 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('date')}
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
                          className="focus:ring-green-500 h-10  focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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
                    <div className="col-span-6">
                      <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                        {t('place')}
                      </label>
                      <input
                        type="text"
                        name="place"
                        id="place"
                        required
                        className="mt-1 h-10 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register('place')}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {t('create')}
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
