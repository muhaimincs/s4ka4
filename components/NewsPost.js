/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from 'react'

function NewsPost ({ title, url, urlToImage, expanded }) {
  const [, setFocusable] = useState(true)
  const ref = useRef()

  useEffect(() => {
    if (ref.current.offsetTop !== 0) {
      setFocusable(false)
    }
  }, [])

  return (
    <li ref={ref} className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse rounded-lg p-3 md:p-6 md:dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
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
      </figure>
    </li>
  )
}

export default NewsPost
