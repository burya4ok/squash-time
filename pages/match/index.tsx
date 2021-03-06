import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Layout } from '../../components/layout'

export default function Match() {
  const { t } = useTranslation('match')

  return <Layout title={t('title')}>Match content</Layout>
}
