/* eslint-disable @next/next/no-img-element */
import my from 'date-fns/locale/ms'
import { formatDistanceToNow } from 'date-fns'

function NewsPost ({ title, url, urlToImage, expanded, publishedAt, source, ...rest }) {
  const dt = new Date(publishedAt)

  return (
    <div className="snap-center shrink-0 first:pl-8 last:pr-8">
      <figure className="w-56 h-40 relative flex flex-col rounded-lg bg-gray-50 md:dark:bg-slate-800 dark:bg-white/5">
        <span className={`text-slate-300 mx-3 mt-2 z-10 ${urlToImage ? 'absolute inset-0' : ''}`}>{source.name}</span>
        {urlToImage
          ? (
            <figcaption className="flex items-center relative overflow-hidden rounded-t-lg">
              <img
                src={urlToImage}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <blockquote className="absolute inset-0 top-auto mt-3 text-slate-700 dark:text-slate-300 px-3 line-clamp-2 bg-gradient-to-t from-black">
                {typeof title === 'string' ? <p>{title}</p> : title}
              </blockquote>
            </figcaption>
            )
          : (
            <blockquote className="mt-1 text-slate-700 dark:text-slate-300 px-3 text-lg line-clamp-4">
              {typeof title === 'string' ? <p>{title}</p> : title}
            </blockquote>
            )}
        <time className='text-slate-300 dark:text-slate-500 mx-3 mb-3'>{formatDistanceToNow(dt, { addSuffix: true, locale: my })}</time>
      </figure>
    </div>
  )
}

export default NewsPost
