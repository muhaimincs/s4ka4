import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const Pagination = ({ page, showNext }) => {
  const locale = useLocale()
  const currentPage = +page
  return (
    <div className="flex justify-between font-medium text-black dark:text-gray-100 max-w-3xl mx-auto px-4">
      <Link
        href={
          currentPage - 1 === 1
            ? `${BLOG.path || '/'}`
            : `/page/${currentPage - 1}`
        }
        className={`${
          currentPage === 1 ? 'invisible' : 'block'
        } cursor-pointer`}
        rel="prev"
      >
        ← {locale.PAGINATION.PREV}
      </Link>
      <Link href={`/page/${currentPage + 1}`} className={`${+showNext ? 'block' : 'invisible'} cursor-pointer`} rel="next">
        {locale.PAGINATION.NEXT} →
      </Link>
    </div>
  )
}

export default Pagination
