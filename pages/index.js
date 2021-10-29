import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps () {
  function arraySort (f) {
    for (let i = this.length; i;) {
      const o = this[--i]
      this[i] = [].concat(f.call(o, o, i), o)
    }
    this.sort(function (a, b) {
      for (let i = 0, len = a.length; i < len; ++i) {
        if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1
      }
      return 0
    })
    for (let i = this.length; i;) {
      this[--i] = this[i][this[i].length - 1]
    }
    return this
  }

  if (typeof Object.defineProperty === 'function') {
    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Array.prototype, 'sortBy', { value: arraySort })
    } catch (e) {

    }
  }
  if (!Array.prototype.sortBy) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.sortBy = arraySort
  }
  const posts = await getAllPosts({ includePages: true })
  const allPosts = posts.sortBy((o) => -new Date(o.date.start_date))
  const postsToShow = allPosts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
