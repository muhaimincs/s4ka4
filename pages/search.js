import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export default function search ({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />
}
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
  const posts = await getAllPosts({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  return {
    props: {
      tags,
      posts: posts.sortBy((o) => -new Date(o.date.start_date))
    },
    revalidate: 1
  }
}
