import Link from 'next/link'

const TagItem = ({ tag }) => (
  <Link
    href={`/tag/${encodeURIComponent(tag)}`}
    className="mr-1 rounded-full px-2 py-1 border leading-none text-sm dark:border-gray-600">
    {tag}
  </Link>
)

export default TagItem
