import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import my from 'date-fns/locale/ms'
import { formatInTimeZone } from 'date-fns-tz'

import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'
import logo from '@/public/logo.png'
import logoDark from '@/public/logo-dark.png'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 2, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  // const useSticky = !BLOG.autoCollapsedNavBar
  const [mode, setMode] = useState('light')
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full')
      } else {
        navRef.current.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef])

  useLayoutEffect(() => {
    const listen = (e) => {
      setMode(e.matches ? 'dark' : 'light')
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listen)
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listen)
    }
  }, [])

  return (
    <>
      <div className="observer-element h-12 text-center text-xs font-semibold text-slate-500 pt-4 " ref={sentinalRef}>
        {formatInTimeZone(new Date(), 'Asia/Kuala_Lumpur', "EEEE d LLL yyyy '| Waktu Semenanjung 🇲🇾:' hh:mm:ss", { locale: my })}
      </div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${!fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
          }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Image src={mode === 'light' ? logo : logoDark} width={48} height={48} />
            </a>
          </Link>
          {navBarTitle
            ? (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {navBarTitle}
              </p>
              )
            : (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {BLOG.title},{' '}
                <span className="font-normal">{BLOG.description}</span>
              </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
