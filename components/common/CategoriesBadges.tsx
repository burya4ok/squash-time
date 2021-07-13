import React, { useMemo } from 'react'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

type CategoriesBadgesProps = {
  className?: string
  categories: string[]
}

export const CATEGORIES = [
  {
    title: 'categories_m3',
    value: 'm3',
    theme: 'green',
  },
  {
    title: 'categories_m2',
    value: 'm2',
    theme: 'indigo',
  },
  {
    title: 'categories_m1',
    value: 'm1',
    theme: 'yellow',
  },
  {
    title: 'categories_pro',
    value: 'pro',
    theme: 'red',
  },
]

export const CategoriesBadges: React.FC<CategoriesBadgesProps> = ({ className, categories = [] }) => {
  const { t } = useTranslation('tournament-form')

  const categoriesBadges = useMemo(() => {
    return categories.map((c1) => CATEGORIES.find((c2) => c1 === c2.value)).filter((c) => !!c)
  }, [categories])

  if (!categoriesBadges.length) {
    return null
  }

  return (
    <div className={classNames('w-full', className)}>
      {categoriesBadges.map((category, i) => (
        <span
          key={`${category.title}-${i}`}
          className={`inline-flex items-center mr-2 px-2 py-0.5 rounded text-xs font-medium bg-${category.theme}-100 text-${category.theme}-800`}
        >
          {t(category.title)}
        </span>
      ))}
    </div>
  )
}
