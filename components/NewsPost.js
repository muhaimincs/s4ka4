/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from 'react'
import my from 'date-fns/locale/ms'
import { formatDistanceToNow } from 'date-fns'

function NewsPost ({ title, url, urlToImage, expanded, publishedAt, source, ...rest }) {
  const [, setFocusable] = useState(true)
  const ref = useRef()
  const dt = new Date(publishedAt)

  useEffect(() => {
    if (ref.current.offsetTop !== 0) {
      setFocusable(false)
    }
  }, [])

  return (
    <li ref={ref} className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse rounded-lg p-3 md:p-6 md:dark:bg-slate-800 dark:highlight-white/5">
        <time className='text-slate-300 dark:text-slate-500'>{formatDistanceToNow(dt, { addSuffix: true, locale: my })}</time>
        <blockquote className="mt-3 text-slate-700 dark:text-slate-300">
          {typeof title === 'string' ? <p>{title}</p> : title}
        </blockquote>
        {urlToImage && (
          <figcaption className="flex items-center space-x-4">
            <img
              src={urlToImage}
              alt={title}
              className="flex-none w-22 rounded object-cover"
              loading="lazy"
            />
          </figcaption>
        )}
        <span className='text-red-500'>{source.name}</span>
      </figure>
    </li>
  )
}

export default NewsPost
