import { createHash } from 'crypto'
import { format } from 'date-fns'

import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import redis from '@/lib/redis'
import BLOG from '@/blog.config'

const BlogPost = ({ post, blockMap, emailHash }) => {
  if (!post) return null
  return (
    <Layout
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      fullWidth={post.fullWidth}
    />
  )
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: true })
  return {
    paths: posts.map(row => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  const date = format(new Date(), 'MM/dd/yyyy')
  const currOnline = await redis.hget('online', `${date}${slug}`) || 0
  if (!currOnline) {
    await redis.hset('online', `${date}${slug}`, 1)
  }
  const url = `${BLOG.news.url}top-headlines?sortBy=popularity&apiKey=${BLOG.news.apiKey}&country=my`
  const reqs = await fetch(url)
  const { articles } = await reqs.json()
  const posts = await getAllPosts({ includePages: true })
  const post = posts.find(t => t.slug === slug)
  const blockMap = await getPostBlocks(post.id)
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  return {
    props: { post, blockMap, emailHash, articles },
    revalidate: 1
  }
}

export default BlogPost
