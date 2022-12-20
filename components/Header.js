import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'
import logo from '@/svg/pesan.svg'
import logoDark from '@/svg/pesan-dark.svg'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: 'Renungan', to: '/tag/Renungan', show: true },
    { id: 1, name: 'Sabath', to: '/tag/sabath', show: true },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <ul className="flex flex-row space-x-3 mr-3 items-center flex-none">
      {links.map(
        link =>
          link.show && (
            <li
              key={link.id}
              className="block text-black dark:text-slate-100 nav"
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
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef])

  useEffect(() => {
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
    <div className="observer-element h-4 flex flex-row" ref={sentinalRef} />
    <div
      className={`sticky-nav mx-auto w-full flex flex-row justify-around items-center md:mb-12 bg-opacity-60 ${!fullWidth ? 'max-w-3xl' : 'md:px-24'}`}
      id="sticky-nav"
      ref={navRef}
    >
      <div className="flex flex-row md:space-y-2 items-center w-full brand">
        <Link href="/" passHref className='grow'>
          <Image src={mode === 'light' ? logo : logoDark} width={224} alt={BLOG.title} />
        </Link>
        <NavBar />
      </div>
    </div>
      {/* <p className="header-name pl-3">
            {BLOG.description}
          </p> */}
      {navBarTitle && (
        <div className={`sticky-nav mx-auto top-[auto!important] bottom-0 inset-x-0 h-10 bg-opacity-60 ${!fullWidth ? 'max-w-3xl' : 'md:px-24'}`}>
          <p className="font-medium text-day dark:text-night header-description">
            {navBarTitle}
          </p>
        </div>
      )}
  </>
  )
}

export default Header
