import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Layout } from '../../components/layout'

export default function Tournament() {
  const { t } = useTranslation('tournament')

  return <Layout title={t('title')}>Tournament content</Layout>
}
