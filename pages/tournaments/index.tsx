import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Layout } from '../../components/layout'

export default function Tournaments() {
  const { t } = useTranslation('tournaments')

  return <Layout title={t('title')}>Tournaments content</Layout>
}
