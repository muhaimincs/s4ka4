import Image from 'next/image'
import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import { NotionRenderer, Equation, Code, CollectionRow, Collection } from 'react-notion-x'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { useLocale } from '@/lib/locale'
import { useRouter } from 'next/router'
import Comments from '@/components/Comments'

const mapPageUrl = id => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

const Layout = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  fullWidth = false
}) => {
  const locale = useLocale()
  const router = useRouter()
  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.summary}
      date={new Date(frontMatter.createdTime).toISOString()}
      type={frontMatter.type[0]}
      fullWidth={fullWidth}
    >
      <article className="overflow-x-hidden max-w-3xl mx-auto">
        {frontMatter.type[0] !== 'Page' && (
          <>
            <h1 className="font-bold text-3xl text-black dark:text-white">
              {frontMatter.title}
            </h1>
            <nav className="flex mt-4 items-center text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <a href='#' className="flex items-center">
                  <div className='rounded-full overflow-hidden w-10 h-10'>
                    <Image
                      alt={frontMatter.Author}
                      width={48}
                      height={48}
                      src={require(`../svg/${frontMatter.Author}.svg`).default}
                    />
                  </div>
                  <p className="ml-2 md:block">{frontMatter.Author}</p>
                </a>
                <span className="block">&nbsp;/&nbsp;</span>
              </div>
              <div className="mr-2 md:ml-0">
                {formatDate(
                  frontMatter?.date?.start_date || frontMatter.createdTime,
                  BLOG.lang
                )}
              </div>
              {frontMatter.tags && (
                <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                  {frontMatter.tags.map(tag => (
                    <TagItem key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </nav>
          </>
        )}
        {children}
        {blockMap && (
          <div className="-mt-4">
            <NotionRenderer
              recordMap={blockMap}
              components={{
                equation: Equation,
                code: Code,
                collectionRow: CollectionRow,
                collection: Collection
              }}
              mapPageUrl={mapPageUrl}
              fullPage={fullWidth}
            />
          </div>
        )}
        <div className={`flex justify-between font-medium text-gray-500 dark:text-gray-400${frontMatter.type[0] === 'Page' ? ' w-full mx-auto px-4 md:px-24' : ''}`}>
          <a>
            <button
              onClick={() => router.push(BLOG.path || '/')}
              className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
            >
              ← {locale.POST.BACK}
            </button>
          </a>
          <a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
            >
              ↑ {locale.POST.TOP}
            </button>
          </a>
        </div>
      </article>
      <Comments frontMatter={frontMatter} />
    </Container>
  )
}

export default Layout
