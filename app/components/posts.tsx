import Link from "next/link";
import { formatDate, getBlogPosts } from "app/projects/utils";
import { formatDate2, getActualBlogPosts } from "app/blog/utils";

export function ActualBlogPosts() {
  let allBlogs = getActualBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <div className="flex flex-col space-y-1 mb-8">
            <div className="w-full flex items-center space-x-2">
              <Link
                key={post.slug}
                className="text-sm text-neutral-600 dark:text-neutral-400 min-w-[100px] tabular-nums hover:no-underline"
                href={`/blog/${post.slug}`}
              >
                {formatDate2(post.metadata.publishedAt, false)}
              </Link>
              <Link
                key={post.slug + "-title"}
                className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:no-underline flex-1"
                href={`/blog/${post.slug}`}
              >
                {post.metadata.title}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <div className="flex flex-col space-y-1 mb-8">
            <div className="w-full flex items-center space-x-2">
              <Link
                key={post.slug}
                className="text-sm text-neutral-600 dark:text-neutral-400 min-w-[100px] tabular-nums hover:no-underline"
                href={`/projects/${post.slug}`}
              >
                {formatDate2(post.metadata.publishedAt, false)}
              </Link>
              <Link
                key={post.slug + "-title"}
                className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:no-underline flex-1"
                href={`/projects/${post.slug}`}
              >
                {post.metadata.title}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
