import { ActualBlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blogs',
  description: 'My thoughts—unfiltered',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My thoughts—unfiltered</h1>
      <ActualBlogPosts />
    </section>
  )
}
