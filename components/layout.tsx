import { Fragment, PropsWithChildren, useMemo } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useUser } from '../hooks/useUser'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import Head from 'next/head'

const navigation = [
  // {
  //   label: 'main',
  //   href: '/main',
  // },
  {
    label: 'tournaments',
    href: '/tournaments',
  },
]

const profile = [
  { label: 'profile', href: '/profile' },
  { label: 'settings', href: '/settings' },
  { label: 'signout', href: '/signout' },
]

export enum LayoutTheme {
  BLUE = 'indigo',
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
  GRAY = 'gray',
}

const ThemeColors = {
  [LayoutTheme.BLUE]: 'rgb(79, 70, 229)',
  [LayoutTheme.GREEN]: 'rgb(5, 150, 105)',
  [LayoutTheme.YELLOW]: 'rgb(217, 119, 6)',
  [LayoutTheme.RED]: 'rgb(239, 68, 68)',
  [LayoutTheme.GRAY]: 'rgb(75, 85, 99)',
}

type LayoutProps = {
  title?: string
  description?: string
  hideTitle?: boolean
  theme?: LayoutTheme
  RightContent?: React.FC<any>
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  title,
  description,
  hideTitle,
  theme = LayoutTheme.BLUE,
  RightContent,
}) => {
  const { t } = useTranslation('layout')
  const router = useRouter()

  const { user, signOut } = useUser()

  const themeColor = useMemo(() => {
    return ThemeColors[theme]
  }, [theme])

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content={themeColor} />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className={`bg-${theme}-600 pb-32`}>
          <Disclosure
            as="nav"
            className={`bg-${theme}-600 border-b border-${theme}-300 border-opacity-25 lg:border-none`}
          >
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                  <div
                    className={`relative h-16 flex items-center justify-between lg:border-b lg:border-${theme}-400 lg:border-opacity-25`}
                  >
                    <div className="px-2 flex items-center lg:px-0">
                      <div className="flex-shrink-0">
                        <Link href="/tournaments">
                          <svg
                            className="mx-auto h-12 w-auto"
                            width="269"
                            height="338"
                            viewBox="0 0 269 338"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M110.914 118.734C109.352 119.255 108.18 119.32 107.398 118.93C106.617 118.539 106.031 117.888 105.641 116.977C105.25 116.065 105.055 115.089 105.055 114.047C105.055 112.875 105.12 111.768 105.25 110.727C105.38 109.815 105.576 108.773 105.836 107.602C106.227 106.43 106.682 105.323 107.203 104.281C107.724 103.24 108.31 102.393 108.961 101.742C109.742 100.961 110.719 100.44 111.891 100.18C117.88 99.138 123.674 98.3568 129.273 97.8359C135.003 97.3151 140.146 96.9245 144.703 96.6641C149.911 96.2734 154.924 96.0781 159.742 96.0781C160.784 96.0781 161.826 96.1432 162.867 96.2734C163.909 96.2734 164.951 96.2734 165.992 96.2734C167.164 96.013 168.076 95.9479 168.727 96.0781C169.508 96.0781 170.159 96.1432 170.68 96.2734C174.456 96.4036 178.362 96.599 182.398 96.8594C185.784 97.1198 189.56 97.4453 193.727 97.8359C198.023 98.0964 202.255 98.487 206.422 99.0078C206.812 100.049 206.878 101.352 206.617 102.914C206.487 103.695 206.357 104.477 206.227 105.258C206.096 106.039 205.771 106.755 205.25 107.406C204.859 108.057 204.339 108.708 203.688 109.359C203.167 109.88 202.516 110.336 201.734 110.727C197.307 110.596 193.01 110.531 188.844 110.531C184.807 110.401 181.227 110.336 178.102 110.336H167.555C165.862 116.326 163.779 123.747 161.305 132.602C158.831 141.326 156.292 150.57 153.688 160.336C151.214 169.971 148.805 179.607 146.461 189.242C144.247 198.747 142.49 207.341 141.188 215.023C139.885 222.445 138.583 229.737 137.281 236.898C136.76 239.893 136.174 243.018 135.523 246.273C135.003 249.529 134.482 252.719 133.961 255.844C133.57 258.969 133.18 261.964 132.789 264.828C132.398 267.693 132.073 270.297 131.812 272.641C129.729 273.682 127.776 274.464 125.953 274.984C124.13 275.635 122.503 276.091 121.07 276.352C119.378 276.742 117.815 276.938 116.383 276.938C113.258 276.938 111.305 276.547 110.523 275.766C109.872 275.115 109.807 273.747 110.328 271.664C110.719 269.841 111.891 264.893 113.844 256.82C114.625 253.435 115.602 249.138 116.773 243.93C118.076 238.852 119.573 232.667 121.266 225.375C122.958 217.953 124.977 209.359 127.32 199.594C129.664 189.698 132.333 178.37 135.328 165.609L148.414 111.312C144.508 111.833 140.667 112.419 136.891 113.07C133.115 113.721 129.534 114.438 126.148 115.219C122.893 115.87 119.898 116.521 117.164 117.172C114.56 117.823 112.477 118.344 110.914 118.734Z"
                              fill="#ffffff"
                            />
                            <path
                              d="M98.0156 118.422C97.8594 117.953 98.3281 116.781 99.4219 114.906C100.516 112.875 101.688 110.453 102.938 107.641C104.344 104.672 105.672 101.391 106.922 97.7969C108.328 94.0469 109.266 90.2187 109.734 86.3125C110.359 82.4063 110.359 78.5 109.734 74.5938C109.109 70.6875 107.469 66.9375 104.812 63.3438C103.25 61.4688 100.906 60.4531 97.7812 60.2969C94.8125 59.9844 91.375 60.4531 87.4688 61.7031C83.7188 62.7969 79.7344 64.5938 75.5156 67.0938C71.4531 69.4375 67.7031 72.25 64.2656 75.5312C60.8281 78.6563 57.8594 82.1719 55.3594 86.0781C53.0156 89.9844 51.6875 93.9687 51.375 98.0312C51.0625 101.312 51.1406 104.359 51.6094 107.172C52.2344 109.984 53.0156 112.562 53.9531 114.906C54.8906 117.25 55.9062 119.438 57 121.469C58.0938 123.5 59.1094 125.297 60.0469 126.859C61.2969 129.047 63.25 131.469 65.9062 134.125C68.5625 136.781 71.4531 139.828 74.5781 143.266C77.7031 146.547 80.8281 150.297 83.9531 154.516C87.0781 158.734 89.8125 163.5 92.1562 168.812C94.5 174.125 96.1406 180.062 97.0781 186.625C98.0156 193.188 97.9375 200.453 96.8438 208.422C95.125 219.984 92.3906 229.594 88.6406 237.25C84.8906 245.062 80.75 251.312 76.2188 256C71.8438 260.688 67.3906 264.047 62.8594 266.078C58.3281 268.266 54.5781 269.672 51.6094 270.297C49.2656 270.766 46.4531 271.156 43.1719 271.469C40.0469 271.938 36.6875 271.859 33.0938 271.234C29.6562 270.766 26.1406 269.672 22.5469 267.953C18.9531 266.391 15.75 263.891 12.9375 260.453C9.65625 256.547 7.07812 252.328 5.20312 247.797C3.48438 243.891 2.23438 239.359 1.45312 234.203C0.515625 229.203 0.90625 223.969 2.625 218.5C3.875 217.094 5.20312 215.844 6.60938 214.75C8.01562 213.656 9.42188 212.719 10.8281 211.938C12.3906 211 14.0312 210.141 15.75 209.359C17.7812 208.734 19.8125 208.188 21.8438 207.719C23.5625 207.406 25.3594 207.25 27.2344 207.25C29.2656 207.094 31.1406 207.328 32.8594 207.953C30.5156 210.609 28.875 213.109 27.9375 215.453C27.3125 216.703 26.8438 217.797 26.5312 218.734C25.9062 221.703 25.6719 225.219 25.8281 229.281C26.1406 233.5 27 237.484 28.4062 241.234C29.9688 245.141 32.1562 248.422 34.9688 251.078C37.7812 253.891 41.5312 255.375 46.2188 255.531C57.625 255.844 67.3125 246.938 75.2812 228.812C77.9375 223.188 79.2656 217.484 79.2656 211.703C79.4219 205.922 78.7188 200.375 77.1562 195.062C75.75 189.75 73.7969 184.828 71.2969 180.297C68.9531 175.609 66.5312 171.625 64.0312 168.344C61.5312 165.062 58.4844 161.547 54.8906 157.797C51.4531 153.891 48.0156 149.672 44.5781 145.141C41.1406 140.609 38.0156 135.688 35.2031 130.375C32.5469 125.062 30.75 119.281 29.8125 113.031C28.5625 104.281 29.3438 96.3125 32.1562 89.125C35.125 81.7812 39.0312 75.375 43.875 69.9062C48.875 64.4375 54.2656 59.9844 60.0469 56.5469C65.9844 53.1094 71.2188 50.9219 75.75 49.9844C100.906 44.9844 117.391 49.2031 125.203 62.6406C128.484 67.7969 130.281 73.2656 130.594 79.0469C130.906 84.8281 130.516 90.2187 129.422 95.2188C128.484 100.062 127.234 104.203 125.672 107.641C124.266 110.922 123.328 112.719 122.859 113.031C121.922 113.969 120.438 114.984 118.406 116.078C116.375 117.172 113.094 118.188 108.562 119.125C107.312 119.438 106.062 119.594 104.812 119.594C103.719 119.594 102.547 119.516 101.297 119.359C100.047 119.203 98.9531 118.891 98.0156 118.422Z"
                              fill="#ffffff"
                            />
                            <circle cx="82.5" cy="96.5" r="12.5" fill="#ffffff" />
                            <circle cx="51.5" cy="226.5" r="12.5" fill="#ffffff" />
                            <circle cx="174" cy="200" r="14" fill="#ffffff" />
                            <circle cx="194" cy="145" r="19" fill="#ffffff" />
                            <circle cx="156" cy="248" r="9" fill="#ffffff" />
                          </svg>
                        </Link>
                      </div>
                      <div className="hidden lg:block lg:ml-10">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link href={item.href} key={item.label}>
                              {router.pathname === item.href ? (
                                <a className={`bg-${theme}-700 text-white rounded-md py-2 px-3 text-sm font-medium`}>
                                  {t(item.label)}
                                </a>
                              ) : (
                                <a
                                  className={`text-white hover:bg-${theme}-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium`}
                                >
                                  {t(item.label)}
                                </a>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button
                        className={`bg-${theme}-600 p-2 rounded-md inline-flex items-center justify-center text-${theme}-200 hover:text-white hover:bg-${theme}-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-600 focus:ring-white`}
                      >
                        <span className="sr-only">{t('open_main_menu')}</span>
                        {open ? (
                          <FontAwesomeIcon icon={faTimes} className="block h-6 w-6 text-white" aria-hidden="true" />
                        ) : (
                          <FontAwesomeIcon icon={faBars} className="block h-6 w-6 text-white" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:block lg:ml-4">
                      <div className="flex items-center">
                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative flex-shrink-0">
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button
                                  className={`bg-${theme}-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-600 focus:ring-white`}
                                >
                                  <span className="sr-only">{t('open_user_menu')}</span>

                                  {user?.picture ? (
                                    <img className="rounded-full h-8 w-8" src={user?.picture} alt="" />
                                  ) : (
                                    <div className="rounded-full bg-white h-8 w-8 justify-center items-center flex">
                                      <FontAwesomeIcon
                                        icon={faUser}
                                        className="block h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  )}
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="z-30 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  {profile.map((item) => (
                                    <Menu.Item key={item.label}>
                                      {({ active }) =>
                                        item.href === '/signout' ? (
                                          <button className="block py-2 px-4 text-sm text-gray-700" onClick={signOut}>
                                            {t(item.label)}
                                          </button>
                                        ) : (
                                          <Link href={item.href}>
                                            <a
                                              className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block py-2 px-4 text-sm text-gray-700',
                                              )}
                                            >
                                              {t(item.label)}
                                            </a>
                                          </Link>
                                        )
                                      }
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.label}>
                        {router.pathname === item.href ? (
                          <a className={`bg-${theme}-700 text-white block rounded-md py-2 px-3 text-base font-medium`}>
                            {t(item.label)}
                          </a>
                        ) : (
                          <a
                            className={`text-white hover:bg-${theme}-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium`}
                          >
                            {t(item.label)}
                          </a>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className={`pt-4 pb-3 border-t border-${theme}-700`}>
                    <div className="px-5 flex items-center">
                      <div className="flex-shrink-0">
                        {user?.picture ? (
                          <img className="rounded-full h-10 w-10" src={user?.picture} alt="" />
                        ) : (
                          <div className="rounded-full bg-white h-10 w-10 justify-center items-center flex">
                            <FontAwesomeIcon icon={faUser} className="block h-6 w-6 text-gray-400" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user?.displayName}</div>
                        <div className={`text-sm font-medium text-${theme}-300`}>{user?.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      {profile.map((item) =>
                        item.href === '/signout' ? (
                          <button
                            key={item.label}
                            className={`block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-${theme}-500 hover:bg-opacity-75`}
                            onClick={signOut}
                          >
                            {t(item.label)}
                          </button>
                        ) : (
                          <Link href={item.href} key={item.label}>
                            <a
                              className={`block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-${theme}-500 hover:bg-opacity-75`}
                            >
                              {t(item.label)}
                            </a>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {!!title && !hideTitle && (
            <header className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                {RightContent && <RightContent />}
              </div>
            </header>
          )}
        </div>

        <main className={classNames('-mt-32 min-h-full', { 'pt-8': !title || hideTitle })}>
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 min-h-full">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 min-h-full">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}
