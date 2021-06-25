import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Layout } from '../../components/layout'

export default function Profile() {
  const { t } = useTranslation('profile')

  return <Layout title={t('title')}>Profile content</Layout>
}
