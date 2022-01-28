import { Fragment } from 'react'
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
  const postsToShow = allPosts.slice(0, BLOG.postsPerPage)
  const totalPosts = allPosts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      news,
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext, news }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {postsToShow.map((post, i) => {
        return (
          <Fragment key={post.id}>
            {i === 3 && news.length && <News news={news} />}
            <BlogPost post={post} />
          </Fragment>
        )
      })}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
