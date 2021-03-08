import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath, blogPage },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout headerInfo={blogPage.hero} pageId={blogPage.id}>
        <SEO title={blogPage.title} />
        <p>
          Uh Oh! No blog posts found.
        </p>
      </Layout>
    )
  }
  
  const headerInfo = {
    header: 'BLOG',
    subtitle: 'Updates, news, & ramblings.',
    backgroundcolor: 'purple',
  }

  return (
    <Layout headerInfo={headerInfo} pageId={blogPage.id}>
      <SEO title={blogPage.title} />
      <div className="max-w-6xl">
        <h1 className="mb-10 text-4xl">Recent Posts</h1>

        <div className="flex flex-col space-y-8">
          {posts.map(post => {
            const title = post.title

            return (
              <Link to={post.uri} key={post.uri} itemProp="url">
                <article
                  className="border-2 border-black bg-gray-900 bg-repeat bg-center bg-texture text-gray-50 shadow-lg px-6 py-4 transform-gpu transition-transform ease-in-out hover:-translate-y-0.5"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>{parse(title)}</h2>
                    <small>{post.date}</small>
                  </header>
                  <section itemProp="description">{parse(post.excerpt)}</section>
                </article>
              </Link>
            )
          })}
        </div>
        <div className="flex flex-row space-x-6 py-10">
          {previousPagePath && (
            <Link to={previousPagePath}>
              ← <span className="underline">Previous</span>
            </Link>
          )}
          {nextPagePath &&
            <Link to={nextPagePath}>
              <span className="underline">Next</span>  →
            </Link>
          }
        </div>
      </div>


    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      filter: {categories: {nodes: {elemMatch: {name: {eq: "Blog"}}}}}
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
      }
    }
  }
`
