/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { faBars, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeLocale } from '../components/common/ChangeLocale'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { BaseURI } from '../constants/config'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const features = [
  {
    name: 'Invite team members',
    description: 'Tempor tellus in aliquet eu et sit nulla tellus. Suspendisse est, molestie blandit quis ac. Lacus.',
  },
  {
    name: 'Notifications',
    description: 'Ornare donec rhoncus vitae nisl velit, neque, mauris dictum duis. Nibh urna non parturient.',
  },
  {
    name: 'List view',
    description: 'Etiam cras augue ornare pretium sit malesuada morbi orci, venenatis. Dictum lacus.',
  },
  {
    name: 'Boards',
    description: 'Interdum quam pulvinar turpis tortor, egestas quis diam amet, natoque. Mauris sagittis.',
  },
  {
    name: 'Keyboard shortcuts',
    description: 'Ullamcorper in ipsum ac feugiat. Senectus at aliquam vulputate mollis nec. In at risus odio.',
  },
  {
    name: 'Reporting',
    description: 'Magna a vel sagittis aliquam eu amet. Et lorem auctor quam nunc odio. Sed bibendum.',
  },
  {
    name: 'Calendars',
    description: 'Sed mi, dapibus turpis orci posuere integer. A porta viverra posuere adipiscing turpis.',
  },
  {
    name: 'Mobile app',
    description: 'Quisque sapien nunc nisl eros. Facilisis sagittis maecenas id dignissim tristique proin sed.',
  },
]

const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Dribbble',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export default function Example() {
  const { t } = useTranslation('landing')
  const router = useRouter()


  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <title>{t('title')}</title>
        <meta name="title" content={t('title')} />
        <meta name="description" content={t('description')} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={BaseURI} />
        <meta property="og:title" content={t('title')} />
        <meta property="og:description" content={t('description')} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={BaseURI} />
        <meta property="twitter:title" content={t('title')} />
        <meta property="twitter:description" content={t('description')} />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="rgb(249, 250, 251)" />
      </Head>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
          <div className="relative h-full max-w-7xl mx-auto">
            <svg
              className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <Popover>
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <nav
                    className="relative flex items-center justify-between sm:h-10 md:justify-center"
                    aria-label="Global"
                  >
                    <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                      <div className="flex items-center justify-between w-full md:w-auto">
                        <a href="#">
                          <span className="sr-only">Squa</span>
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
                              fill="rgb(79, 70, 229)"
                            />
                            <path
                              d="M98.0156 118.422C97.8594 117.953 98.3281 116.781 99.4219 114.906C100.516 112.875 101.688 110.453 102.938 107.641C104.344 104.672 105.672 101.391 106.922 97.7969C108.328 94.0469 109.266 90.2187 109.734 86.3125C110.359 82.4063 110.359 78.5 109.734 74.5938C109.109 70.6875 107.469 66.9375 104.812 63.3438C103.25 61.4688 100.906 60.4531 97.7812 60.2969C94.8125 59.9844 91.375 60.4531 87.4688 61.7031C83.7188 62.7969 79.7344 64.5938 75.5156 67.0938C71.4531 69.4375 67.7031 72.25 64.2656 75.5312C60.8281 78.6563 57.8594 82.1719 55.3594 86.0781C53.0156 89.9844 51.6875 93.9687 51.375 98.0312C51.0625 101.312 51.1406 104.359 51.6094 107.172C52.2344 109.984 53.0156 112.562 53.9531 114.906C54.8906 117.25 55.9062 119.438 57 121.469C58.0938 123.5 59.1094 125.297 60.0469 126.859C61.2969 129.047 63.25 131.469 65.9062 134.125C68.5625 136.781 71.4531 139.828 74.5781 143.266C77.7031 146.547 80.8281 150.297 83.9531 154.516C87.0781 158.734 89.8125 163.5 92.1562 168.812C94.5 174.125 96.1406 180.062 97.0781 186.625C98.0156 193.188 97.9375 200.453 96.8438 208.422C95.125 219.984 92.3906 229.594 88.6406 237.25C84.8906 245.062 80.75 251.312 76.2188 256C71.8438 260.688 67.3906 264.047 62.8594 266.078C58.3281 268.266 54.5781 269.672 51.6094 270.297C49.2656 270.766 46.4531 271.156 43.1719 271.469C40.0469 271.938 36.6875 271.859 33.0938 271.234C29.6562 270.766 26.1406 269.672 22.5469 267.953C18.9531 266.391 15.75 263.891 12.9375 260.453C9.65625 256.547 7.07812 252.328 5.20312 247.797C3.48438 243.891 2.23438 239.359 1.45312 234.203C0.515625 229.203 0.90625 223.969 2.625 218.5C3.875 217.094 5.20312 215.844 6.60938 214.75C8.01562 213.656 9.42188 212.719 10.8281 211.938C12.3906 211 14.0312 210.141 15.75 209.359C17.7812 208.734 19.8125 208.188 21.8438 207.719C23.5625 207.406 25.3594 207.25 27.2344 207.25C29.2656 207.094 31.1406 207.328 32.8594 207.953C30.5156 210.609 28.875 213.109 27.9375 215.453C27.3125 216.703 26.8438 217.797 26.5312 218.734C25.9062 221.703 25.6719 225.219 25.8281 229.281C26.1406 233.5 27 237.484 28.4062 241.234C29.9688 245.141 32.1562 248.422 34.9688 251.078C37.7812 253.891 41.5312 255.375 46.2188 255.531C57.625 255.844 67.3125 246.938 75.2812 228.812C77.9375 223.188 79.2656 217.484 79.2656 211.703C79.4219 205.922 78.7188 200.375 77.1562 195.062C75.75 189.75 73.7969 184.828 71.2969 180.297C68.9531 175.609 66.5312 171.625 64.0312 168.344C61.5312 165.062 58.4844 161.547 54.8906 157.797C51.4531 153.891 48.0156 149.672 44.5781 145.141C41.1406 140.609 38.0156 135.688 35.2031 130.375C32.5469 125.062 30.75 119.281 29.8125 113.031C28.5625 104.281 29.3438 96.3125 32.1562 89.125C35.125 81.7812 39.0312 75.375 43.875 69.9062C48.875 64.4375 54.2656 59.9844 60.0469 56.5469C65.9844 53.1094 71.2188 50.9219 75.75 49.9844C100.906 44.9844 117.391 49.2031 125.203 62.6406C128.484 67.7969 130.281 73.2656 130.594 79.0469C130.906 84.8281 130.516 90.2187 129.422 95.2188C128.484 100.062 127.234 104.203 125.672 107.641C124.266 110.922 123.328 112.719 122.859 113.031C121.922 113.969 120.438 114.984 118.406 116.078C116.375 117.172 113.094 118.188 108.562 119.125C107.312 119.438 106.062 119.594 104.812 119.594C103.719 119.594 102.547 119.516 101.297 119.359C100.047 119.203 98.9531 118.891 98.0156 118.422Z"
                              fill="rgb(79, 70, 229)"
                            />
                            <circle cx="82.5" cy="96.5" r="12.5" fill="rgb(79, 70, 229)" />
                            <circle cx="51.5" cy="226.5" r="12.5" fill="rgb(79, 70, 229)" />
                            <circle cx="174" cy="200" r="14" fill="rgb(79, 70, 229)" />
                            <circle cx="194" cy="145" r="19" fill="rgb(79, 70, 229)" />
                            <circle cx="156" cy="248" r="9" fill="rgb(79, 70, 229)" />
                          </svg>
                        </a>
                        <div className="-mr-2 flex items-center md:hidden">
                          <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex md:space-x-10">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                      <span className="inline-flex rounded-md shadow">
                        <Link href="/signin">
                          <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                            Log in
                          </a>
                        </Link>
                      </span>
                    </div>
                  </nav>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                  >
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
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
                              fill="rgb(79, 70, 229)"
                            />
                            <path
                              d="M98.0156 118.422C97.8594 117.953 98.3281 116.781 99.4219 114.906C100.516 112.875 101.688 110.453 102.938 107.641C104.344 104.672 105.672 101.391 106.922 97.7969C108.328 94.0469 109.266 90.2187 109.734 86.3125C110.359 82.4063 110.359 78.5 109.734 74.5938C109.109 70.6875 107.469 66.9375 104.812 63.3438C103.25 61.4688 100.906 60.4531 97.7812 60.2969C94.8125 59.9844 91.375 60.4531 87.4688 61.7031C83.7188 62.7969 79.7344 64.5938 75.5156 67.0938C71.4531 69.4375 67.7031 72.25 64.2656 75.5312C60.8281 78.6563 57.8594 82.1719 55.3594 86.0781C53.0156 89.9844 51.6875 93.9687 51.375 98.0312C51.0625 101.312 51.1406 104.359 51.6094 107.172C52.2344 109.984 53.0156 112.562 53.9531 114.906C54.8906 117.25 55.9062 119.438 57 121.469C58.0938 123.5 59.1094 125.297 60.0469 126.859C61.2969 129.047 63.25 131.469 65.9062 134.125C68.5625 136.781 71.4531 139.828 74.5781 143.266C77.7031 146.547 80.8281 150.297 83.9531 154.516C87.0781 158.734 89.8125 163.5 92.1562 168.812C94.5 174.125 96.1406 180.062 97.0781 186.625C98.0156 193.188 97.9375 200.453 96.8438 208.422C95.125 219.984 92.3906 229.594 88.6406 237.25C84.8906 245.062 80.75 251.312 76.2188 256C71.8438 260.688 67.3906 264.047 62.8594 266.078C58.3281 268.266 54.5781 269.672 51.6094 270.297C49.2656 270.766 46.4531 271.156 43.1719 271.469C40.0469 271.938 36.6875 271.859 33.0938 271.234C29.6562 270.766 26.1406 269.672 22.5469 267.953C18.9531 266.391 15.75 263.891 12.9375 260.453C9.65625 256.547 7.07812 252.328 5.20312 247.797C3.48438 243.891 2.23438 239.359 1.45312 234.203C0.515625 229.203 0.90625 223.969 2.625 218.5C3.875 217.094 5.20312 215.844 6.60938 214.75C8.01562 213.656 9.42188 212.719 10.8281 211.938C12.3906 211 14.0312 210.141 15.75 209.359C17.7812 208.734 19.8125 208.188 21.8438 207.719C23.5625 207.406 25.3594 207.25 27.2344 207.25C29.2656 207.094 31.1406 207.328 32.8594 207.953C30.5156 210.609 28.875 213.109 27.9375 215.453C27.3125 216.703 26.8438 217.797 26.5312 218.734C25.9062 221.703 25.6719 225.219 25.8281 229.281C26.1406 233.5 27 237.484 28.4062 241.234C29.9688 245.141 32.1562 248.422 34.9688 251.078C37.7812 253.891 41.5312 255.375 46.2188 255.531C57.625 255.844 67.3125 246.938 75.2812 228.812C77.9375 223.188 79.2656 217.484 79.2656 211.703C79.4219 205.922 78.7188 200.375 77.1562 195.062C75.75 189.75 73.7969 184.828 71.2969 180.297C68.9531 175.609 66.5312 171.625 64.0312 168.344C61.5312 165.062 58.4844 161.547 54.8906 157.797C51.4531 153.891 48.0156 149.672 44.5781 145.141C41.1406 140.609 38.0156 135.688 35.2031 130.375C32.5469 125.062 30.75 119.281 29.8125 113.031C28.5625 104.281 29.3438 96.3125 32.1562 89.125C35.125 81.7812 39.0312 75.375 43.875 69.9062C48.875 64.4375 54.2656 59.9844 60.0469 56.5469C65.9844 53.1094 71.2188 50.9219 75.75 49.9844C100.906 44.9844 117.391 49.2031 125.203 62.6406C128.484 67.7969 130.281 73.2656 130.594 79.0469C130.906 84.8281 130.516 90.2187 129.422 95.2188C128.484 100.062 127.234 104.203 125.672 107.641C124.266 110.922 123.328 112.719 122.859 113.031C121.922 113.969 120.438 114.984 118.406 116.078C116.375 117.172 113.094 118.188 108.562 119.125C107.312 119.438 106.062 119.594 104.812 119.594C103.719 119.594 102.547 119.516 101.297 119.359C100.047 119.203 98.9531 118.891 98.0156 118.422Z"
                              fill="rgb(79, 70, 229)"
                            />
                            <circle cx="82.5" cy="96.5" r="12.5" fill="rgb(79, 70, 229)" />
                            <circle cx="51.5" cy="226.5" r="12.5" fill="rgb(79, 70, 229)" />
                            <circle cx="174" cy="200" r="14" fill="rgb(79, 70, 229)" />
                            <circle cx="194" cy="145" r="19" fill="rgb(79, 70, 229)" />
                            <circle cx="156" cy="248" r="9" fill="rgb(79, 70, 229)" />
                          </svg>
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <FontAwesomeIcon icon={faTimes} className="block h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <Link href="/signin">
                        <a className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                          Log in
                        </a>
                      </Link>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Data to enrich your</span>{' '}
                <span className="block text-indigo-600 xl:inline">online business</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="bg-white relative">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">All-in-one platform</h2>
              <p className="mt-4 text-lg text-gray-500">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla
                nec.
              </p>
            </div>
            <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <FontAwesomeIcon icon={faCheck} className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <footer className="bg-white" aria-labelledby="footerHeading">
          <h2 id="footerHeading" className="sr-only">
            Footer
          </h2>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
              <div className="grid grid-cols-2 gap-8 xl:col-span-4">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.support.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-12 xl:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Language</h3>
                <form className="mt-4 sm:max-w-xs">
                  <ChangeLocale hideLabel align="left" />
                </form>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 lg:flex lg:items-center lg:justify-between xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  The latest news, articles, and resources, sent to your inbox weekly.
                </p>
              </div>
              <form className="mt-4 sm:flex sm:max-w-md lg:mt-0">
                <label htmlFor="emailAddress" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 sm:max-w-xs"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2">
                {footerNavigation.social.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                &copy; 2020 Workflow, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
