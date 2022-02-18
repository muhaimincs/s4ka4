import NewsPost from '@/components/NewsPost'

const News = ({ news, perChunk = 6 }) => {
  return (
    <section tabIndex="-1" className='relative focus:outline-none mb-10'>
      <header className="mb-1 md:mb-8 mx-3 md:mx-auto flex-grow w-full transition-all max-w-3xl px-4">
        <span className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-slate-600 dark:text-gray-400">Kabar Hari Ini</span>
      </header>
      <div className='max-w-3xl mx-auto'>
        <div className="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto">
          {news.map((nw, i) => (
            <NewsPost key={nw.title} {...nw} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default News
