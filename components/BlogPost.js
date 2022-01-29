/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'

const BlogPost = ({ post }) => {
  return (
    <article key={post.id} className="mb-3 md:w-full transition-all md:max-w-3xl py-3 md:dark:bg-[#111] border rounded-md px-4 mx-3 md:mx-auto">
        <header className="flex flex-col justify-between md:flex-row md:items-start">
          <Link href={`${BLOG.path}/${post.slug}`}>
            <a>
              <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
                {post.title}
              </h2>
            </a>
          </Link>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400 md:mt-5 mr-4">
            {formatDate(post?.date?.start_date || post.publishedAt, BLOG.lang)}
          </time>
        </header>
      {post.summary && (
        <main className='pb-5 hidden md:block'>
          <p className="leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main>
      )}
    </article>
  )
}

export default BlogPost
