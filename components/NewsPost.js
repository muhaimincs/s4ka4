/* eslint-disable @next/next/no-img-element */
import my from 'date-fns/locale/ms'
import { formatDistanceToNow } from 'date-fns'

function NewsPost ({ title, url, urlToImage, expanded, publishedAt, source, ...rest }) {
  const dt = new Date(publishedAt)

  return (
    <div className="snap-center shrink-0 first:pl-8 last:pr-8">
      <figure className="w-80 h-60 relative flex flex-col-reverse rounded-lg md:p-6 md:dark:bg-slate-800 dark:bg-white/5">
        <time className='text-slate-300 dark:text-slate-500 mx-3 mb-3'>{formatDistanceToNow(dt, { addSuffix: true, locale: my })}</time>
        {urlToImage
          ? (
            <figcaption className="flex items-center relative overflow-hidden rounded-t-lg">
              <img
                src={urlToImage}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <blockquote className="absolute inset-0 top-auto mt-3 text-slate-700 dark:text-slate-300 px-3 line-clamp-2">
                {typeof title === 'string' ? <p>{title}</p> : title}
              </blockquote>
            </figcaption>
            )
          : (
            <blockquote className="mt-3 text-slate-700 dark:text-slate-300 px-3 text-3xl line-clamp-4">
              {typeof title === 'string' ? <p>{title}</p> : title}
            </blockquote>
            )}
        <span className={`text-slate-300 mx-3 ${urlToImage ? 'absolute inset-0' : ''}`}>{source.name}</span>
      </figure>
    </div>
  )
}

export default NewsPost
