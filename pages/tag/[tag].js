import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export default function Tag ({ tags, posts, currentTag }) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
}

export async function getStaticProps ({ params }) {
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
  const currentTag = params.tag
  const posts = await getAllPosts({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  const filteredPosts = posts.filter(
    post => post && post.tags && post.tags.includes(currentTag)
  )
  const sortedPost = filteredPosts.sortBy((o) => -new Date(o.date.start_date))
  return {
    props: {
      tags,
      posts: sortedPost,
      currentTag
    },
    revalidate: 1
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  return {
    paths: Object.keys(tags).map(tag => ({ params: { tag } })),
    fallback: true
  }
}
