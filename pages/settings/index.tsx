import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ChangeLocale } from '../../components/common/ChangeLocale'
import { Layout } from '../../components/layout'

export default function Settings() {
  const { t } = useTranslation('settings')

  return (
    <Layout title={t('title')}>
      <ChangeLocale />
    </Layout>
  )
}
