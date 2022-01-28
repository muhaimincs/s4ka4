import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'
import BLOG from '@/blog.config'

export default function search ({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />
}
export async function getStaticProps () {
  const url = `${BLOG.news.url}top-headlines?sortBy=popularity&apiKey=${BLOG.news.apiKey}&country=my`
  const reqs = await fetch(url)
  const { articles } = await reqs.json()
  const posts = await getAllPosts({ includePages: false })
  const tags = getAllTagsFromPosts(posts)
  return {
    props: {
      tags,
      posts,
      articles
    },
    revalidate: 1
  }
}
