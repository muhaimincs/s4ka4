import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import NewsPost from '@/components/NewsPost'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

const News = ({ news, perChunk = 6 }) => {
  const ref = useRef()
  const [expanded, setExpanded] = useState(false)
  const [showCollapseButton, setShowCollapseButton] = useState(false)
  const [transition, setTransition] = useState(false)
  const { ref: inViewRef, inView } = useInView({ threshold: 0 })
  const initial = useRef(true)
  const result = news.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    if (expanded) {
      ref.current.focus({ preventScroll: expanded })
    } else {
      ref.current.focus()
      ref.current.scrollIntoView()
    }
    if (expanded) {
      setShowCollapseButton(false)
    }
  }, [expanded])

  useEffect(() => {
    setTimeout(() => setTransition(expanded), 0)
  }, [expanded])

  useEffect(() => {
    if (!expanded || !inView) return
    function onScroll () {
      const bodyRect = document.body.getBoundingClientRect()
      const rect = ref.current.getBoundingClientRect()
      const middle = rect.top + rect.height / 4 - bodyRect.top - window.innerHeight / 2
      const isHalfWay = window.scrollY > middle
      if (showCollapseButton && !isHalfWay) {
        setShowCollapseButton(false)
      } else if (!showCollapseButton && isHalfWay) {
        setShowCollapseButton(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [expanded, showCollapseButton, inView])

  return (
    <section ref={ref} tabIndex="-1" className='relative focus:outline-none mb-10'>
      <header className="mb-6 md:mb-8 mx-auto flex-grow w-full transition-all max-w-3xl px-4 border-b border-b-slate-400">
        <span className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-400">Kabar Hari Ini</span>
      </header>
      <div className='max-w-3xl mx-auto'>
        <div ref={inViewRef} className='grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-h-[33rem] overflow-hidden'>
          {result.map((column, i) => (
            <ul
              key={i}
              className={`space-y-8 ${i === 1 && 'hidden sm:block'} ${i === 2 && 'hidden lg:block'}`}
            >
              {column.map((news) => (
                <NewsPost key={news.title} {...news} />
              ))}
            </ul>
          ))}
        </div>
        <div className='inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900 absolute max-w-3xl mx-auto' />
      </div>
    </section>
  )
}

export default News
