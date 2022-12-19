import { useRef, useLayoutEffect, useState } from 'react'
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
    { id: 0, name: 'Sabath', to: '/tag/sabath', show: true },
    { id: 1, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 2, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <ul className="flex flex-row space-x-3 mr-3 items-center">
      {links.map(
        link =>
          link.show && (
            <li
              key={link.id}
              className="block text-black dark:text-gray-50 nav"
            >
              <Link href={link.to}>
                {link.name}
              </Link>
            </li>
          )
      )}
    </ul>
  )
}

const Header = ({ navBarTitle, fullWidth, lastTwoPosts }) => {
  // const useSticky = !BLOG.autoCollapsedNavBar
  const [mode, setMode] = useState('light')
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef) {
      if (navRef.current) {
        if (!entry.isIntersecting && entry !== undefined) {
          navRef.current.classList.add('sticky-nav-full')
          navRef.current.classList.add('py-0')
        } else {
          navRef.current.classList.remove('sticky-nav-full')
          navRef.current.classList.remove('py-0')
        }
      } else {
        navRef.current.classList.add('remove-sticky')
      }
    }
  }
  useLayoutEffect(() => {
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

  return <>
    <div className="observer-element h-12 flex flex-row" ref={sentinalRef}>
      <span className="text-center text-xs font-semibold text-slate-500 pt-4 max-w-xs mx-auto">
        {formatInTimeZone(new Date(), 'Asia/Kuala_Lumpur', "EEEE d LLL yyyy '| Waktu Semenanjung 🇲🇾:' hh:mm:ss", { locale: my })}
      </span>
      <div className="hidden md:block">
        <NavBar />
      </div>
    </div>
    <div
      className={
        `sticky-nav mx-auto w-full flex flex-row justify-around items-center md:mb-12 bg-opacity-60 ${!fullWidth ? 'max-w-7xl' : 'md:px-24'}`}
      id="sticky-nav"
      ref={navRef}
    >
        <div className="hidden md:block md:max-w-[15rem] px-3">
          {lastTwoPosts && lastTwoPosts.length && (
            (<Link
              href={`/${lastTwoPosts[0].slug}`}
              className="text-slate-300 line-clamp-3 text-xs">

              <a className="dark:bg-slate-500 text-slate-50 mr-1 px-2">{lastTwoPosts[0].tags[0]}</a>
              {lastTwoPosts[0].summary}

            </Link>)
          )}
        </div>
        <div className="flex flex-row md:flex-col md:space-y-2 items-center justify-between w-full px-3 brand md:max-w-md">
          <div className="flex items-center md:flex-col space-x-3 md:space-x-0 md:space-y-3">
            <Link href="/">

              <a className="overflow-hidden h-12">
                <Image src={mode === 'light' ? logo : logoDark} width={48} height={48} />
              </a>

            </Link>
            <p className="header-name">
              {BLOG.title}
            </p>
            {navBarTitle &&
              (
              <p className="font-medium text-day dark:text-night header-description">
                {navBarTitle}
              </p>
              )}
          </div>
          <div className="block md:hidden">
            <NavBar />
          </div>
        </div>
        <div className="hidden md:block md:max-w-[15rem] px-3">
          {lastTwoPosts && lastTwoPosts.length && (
            <p className="text-slate-300 line-clamp-3 text-xs">
              <span className="dark:bg-slate-500 text-slate-50 mr-1 px-2">{lastTwoPosts[1].tags[0]}</span>
              {lastTwoPosts[1].summary}
            </p>
          )}
        </div>
    </div>
  </>
}

export default Header
