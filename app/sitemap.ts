import { getBlogPosts } from 'app/projects/utils'
import { getActualBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://udeet.in'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  let blogs2 = getActualBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes2 = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...routes2, ...blogs2]
}
