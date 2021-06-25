import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Layout } from '../../components/layout'

export default function Dashboard() {
  const { t } = useTranslation('main')

  return <Layout title={t('title')}>main content</Layout>
}
