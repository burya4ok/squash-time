import React, { useCallback } from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import i18nConfig from '../../i18n.json'
import { faCheck, faSort } from '@fortawesome/free-solid-svg-icons'

type ChangeLocaleProps = {
  className?: string
  classNameInner?: string
}

export const ChangeLocale: React.FC<ChangeLocaleProps> = ({ className, classNameInner }) => {
  const { t, lang } = useTranslation('change-locale')
  const [selected, setSelected] = useState(lang)

  const onChange = useCallback((locale: string) => {
    setSelected(locale)
    setLanguage(locale)
  }, [])

  return (
    <div className={classNames('mt-4', className)}>
      <Listbox value={selected} onChange={onChange}>
        {({ open }) => (
          <div className={classNames('flex items-center justify-end', classNameInner)}>
            <Listbox.Label className="block text-sm font-medium text-gray-700">{t('label')}</Listbox.Label>
            <div className="ml-4 mt-1 relative">
              <Listbox.Button className="relative w-40 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selected}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FontAwesomeIcon icon={faSort} className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {i18nConfig.locales.map((locale) => (
                    <Listbox.Option
                      key={locale}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-8 pr-4',
                        )
                      }
                      value={locale}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {locale}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                              )}
                            >
                              <FontAwesomeIcon icon={faCheck} className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  )
}
