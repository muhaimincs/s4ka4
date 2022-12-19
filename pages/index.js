/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react'
import { subMonths } from 'date-fns'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import News from '@/components/News'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps () {
  const url = `${BLOG.news.url}top-headlines?sortBy=popularity&apiKey=${BLOG.news.apiKey}&country=my`
  const reqs = await fetch(url)
  const { articles: news } = await reqs.json()
  const allPosts = await getAllPosts({ includePages: true })
  const postsToShow = allPosts
    .filter(p => p.type[0] === 'Post')
    .slice(0, BLOG.postsPerPage)
  const wejangans = allPosts.filter(p => p.type[0] === 'Wejangan')
  const wejangan = wejangans[Math.floor(Math.random() * wejangans.length)]
  const lastTwoPosts = allPosts
    .filter(post => {
      const dt = new Date(post?.date?.start_date)
      const curr = subMonths(new Date(), 2)
      return dt.getMonth() === curr.getMonth()
    })
    .slice(-2)
  const totalPosts = allPosts.length
  const showNext = totalPosts > BLOG.postsPerPage

  if (BLOG.isProd) {
    const payload = {
      host: BLOG.path,
      key: BLOG.indexNowBing,
      keyLocation: `https://${BLOG.path}/${BLOG.indexNowBing}.txt`,
      urlList: allPosts
        .filter(p => p.type[0] !== 'Wejangan')
        .map(row => `${BLOG.path}/${row.slug}`)
    }
    // const reqs = await fetch(`https://www.bing.com/indexnow?url=https://${BLOG.path}/${post.slug}&key=${BLOG.indexNowBing}`)
    const reqs = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (reqs.status !== 200) {
      const res = await reqs.json()
      console.log('Failed to publish to IndexNow for Bing', res)
    } else {
      const res = await reqs.json()
      console.log('respond', res)
    }
  }

  return {
    props: {
      page: 1, // current page is 1
      news,
      postsToShow,
      showNext,
      lastTwoPosts,
      wejangan
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext, news, lastTwoPosts, wejangan }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description} lastTwoPosts={lastTwoPosts}>
      {postsToShow.map((post, i) => {
        return (
          <Fragment key={post.id}>
            {i === 3 && news.length && <News news={news} />}
            {i === 7 && (
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="relative py-24 px-8 bg-indigo-500 rounded-xl shadow-2xl overflow-hidden lg:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8">
                  <div className="absolute inset-0 opacity-50 filter saturate-0 mix-blend-multiply">
                    <img
                      src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative lg:col-span-1">
                    <svg
                      className="absolute top-0 left-0 transform -translate-x-8 -translate-y-24 h-36 w-36 text-indigo-200 opacity-50"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 144 144"
                      aria-hidden="true"
                    >
                      <path
                        strokeWidth={2}
                        d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                      />
                    </svg>
                    <p className="text-3xl text-gray-100 font-semibold uppercase tracking-wide">
                      Siklus Mutiara
                    </p>
                    <blockquote className="mt-6 text-white">
                      <p className="text-xl font-medium sm:text-2xl">
                        {wejangan.summary}
                      </p>
                      <footer className="mt-6">
                        <p className="flex flex-col font-medium">
                          <span>YMM</span>
                          <span>Kehadirannya dirindui</span>
                        </p>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            )}
            <BlogPost post={post} />
          </Fragment>
        )
      })}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
