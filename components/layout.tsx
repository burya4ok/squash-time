import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { auth } from '../utils/firebase'

export const Layout = ({ children }) => {
  const signOut = () => {
    auth().signOut()
  }
  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <FontAwesomeIcon icon={faTimes} className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
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
                        fill="#4F46E5"
                      />
                      <path
                        d="M98.0156 118.422C97.8594 117.953 98.3281 116.781 99.4219 114.906C100.516 112.875 101.688 110.453 102.938 107.641C104.344 104.672 105.672 101.391 106.922 97.7969C108.328 94.0469 109.266 90.2187 109.734 86.3125C110.359 82.4063 110.359 78.5 109.734 74.5938C109.109 70.6875 107.469 66.9375 104.812 63.3438C103.25 61.4688 100.906 60.4531 97.7812 60.2969C94.8125 59.9844 91.375 60.4531 87.4688 61.7031C83.7188 62.7969 79.7344 64.5938 75.5156 67.0938C71.4531 69.4375 67.7031 72.25 64.2656 75.5312C60.8281 78.6563 57.8594 82.1719 55.3594 86.0781C53.0156 89.9844 51.6875 93.9687 51.375 98.0312C51.0625 101.312 51.1406 104.359 51.6094 107.172C52.2344 109.984 53.0156 112.562 53.9531 114.906C54.8906 117.25 55.9062 119.438 57 121.469C58.0938 123.5 59.1094 125.297 60.0469 126.859C61.2969 129.047 63.25 131.469 65.9062 134.125C68.5625 136.781 71.4531 139.828 74.5781 143.266C77.7031 146.547 80.8281 150.297 83.9531 154.516C87.0781 158.734 89.8125 163.5 92.1562 168.812C94.5 174.125 96.1406 180.062 97.0781 186.625C98.0156 193.188 97.9375 200.453 96.8438 208.422C95.125 219.984 92.3906 229.594 88.6406 237.25C84.8906 245.062 80.75 251.312 76.2188 256C71.8438 260.688 67.3906 264.047 62.8594 266.078C58.3281 268.266 54.5781 269.672 51.6094 270.297C49.2656 270.766 46.4531 271.156 43.1719 271.469C40.0469 271.938 36.6875 271.859 33.0938 271.234C29.6562 270.766 26.1406 269.672 22.5469 267.953C18.9531 266.391 15.75 263.891 12.9375 260.453C9.65625 256.547 7.07812 252.328 5.20312 247.797C3.48438 243.891 2.23438 239.359 1.45312 234.203C0.515625 229.203 0.90625 223.969 2.625 218.5C3.875 217.094 5.20312 215.844 6.60938 214.75C8.01562 213.656 9.42188 212.719 10.8281 211.938C12.3906 211 14.0312 210.141 15.75 209.359C17.7812 208.734 19.8125 208.188 21.8438 207.719C23.5625 207.406 25.3594 207.25 27.2344 207.25C29.2656 207.094 31.1406 207.328 32.8594 207.953C30.5156 210.609 28.875 213.109 27.9375 215.453C27.3125 216.703 26.8438 217.797 26.5312 218.734C25.9062 221.703 25.6719 225.219 25.8281 229.281C26.1406 233.5 27 237.484 28.4062 241.234C29.9688 245.141 32.1562 248.422 34.9688 251.078C37.7812 253.891 41.5312 255.375 46.2188 255.531C57.625 255.844 67.3125 246.938 75.2812 228.812C77.9375 223.188 79.2656 217.484 79.2656 211.703C79.4219 205.922 78.7188 200.375 77.1562 195.062C75.75 189.75 73.7969 184.828 71.2969 180.297C68.9531 175.609 66.5312 171.625 64.0312 168.344C61.5312 165.062 58.4844 161.547 54.8906 157.797C51.4531 153.891 48.0156 149.672 44.5781 145.141C41.1406 140.609 38.0156 135.688 35.2031 130.375C32.5469 125.062 30.75 119.281 29.8125 113.031C28.5625 104.281 29.3438 96.3125 32.1562 89.125C35.125 81.7812 39.0312 75.375 43.875 69.9062C48.875 64.4375 54.2656 59.9844 60.0469 56.5469C65.9844 53.1094 71.2188 50.9219 75.75 49.9844C100.906 44.9844 117.391 49.2031 125.203 62.6406C128.484 67.7969 130.281 73.2656 130.594 79.0469C130.906 84.8281 130.516 90.2187 129.422 95.2188C128.484 100.062 127.234 104.203 125.672 107.641C124.266 110.922 123.328 112.719 122.859 113.031C121.922 113.969 120.438 114.984 118.406 116.078C116.375 117.172 113.094 118.188 108.562 119.125C107.312 119.438 106.062 119.594 104.812 119.594C103.719 119.594 102.547 119.516 101.297 119.359C100.047 119.203 98.9531 118.891 98.0156 118.422Z"
                        fill="#4F46E5"
                      />
                      <circle cx="82.5" cy="96.5" r="12.5" fill="#4F46E5" />
                      <circle cx="51.5" cy="226.5" r="12.5" fill="#4F46E5" />
                      <circle cx="174" cy="200" r="14" fill="#4F46E5" />
                      <circle cx="194" cy="145" r="19" fill="#4F46E5" />
                      <circle cx="156" cy="248" r="9" fill="#4F46E5" />
                    </svg>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href="#"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Team
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Calendar
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FontAwesomeIcon icon={faPlus} className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      <span>New Job</span>
                    </button>
                  </div>
                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={signOut}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <a
                  href="#"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Calendar
                </a>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Tom Cook</div>
                    <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Settings
                  </a>
                  <button
                    onClick={signOut}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  )
}
