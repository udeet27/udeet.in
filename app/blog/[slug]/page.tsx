import { notFound } from 'next/navigation'
import { CustomMDX } from "app/components/mdx";
import { formatDate2, getActualBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import VisitorCounterBlog from '../../components/VisitorCounterBlog';

export async function generateStaticParams() {
  let posts = getActualBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

    if (!slug) {
        notFound();
    }

  let post = getActualBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } =  await params;

  if (!slug) {
      notFound();
  }


  let post = getActualBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-0 py-0 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="text-sm">
          {formatDate2(post.metadata.publishedAt)}
        </p>
        <VisitorCounterBlog name={post.metadata.title} />
      </div>
      <article className="prose">
        <CustomMDX source={post.content} components={{VisitorCounterBlog}} />
      </article>
    </section>
  );
}
