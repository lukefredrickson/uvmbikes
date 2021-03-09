import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ 
    data: { previous, next, post },
    pageContext: { blogPage }
  }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  
  const headerInfo = {
    header: 'BLOG',
    subtitle: 'Updates, news, & ramblings.',
    backgroundcolor: 'purple',
  }

  return (
    <Layout headerInfo={headerInfo} pageId={blogPage.id}>
      <SEO title={post.title} description={post.excerpt} />
      
      <article
        className="max-w-5xl"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Link className="text-2xl mb-10 no-underline" to={blogPage.uri}>
          ← <span className="underline">{blogPage.slug}</span>
        </Link>
        <header className="my-10">
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <GatsbyImage
              className="border-2 border-black shadow-lg"
              image={featuredImage.fluid}
              alt={featuredImage.alt}/>
          )}
          <h1 itemProp="headline">{parse(post.title)}</h1>

          <p>{post.date}</p>

          
        </header>

        {!!post.content && (
          <section itemProp="articleBody">{parse(post.content)}</section>
        )}

        <nav className="py-10 flex w-full justify-between">
              {previous && (
                <Link className="mr-auto no-underline" to={previous.uri} rel="prev">
                  ← <span className="underline">{parse(previous.title)}</span>
                </Link>
              )}
              {next && (
                <Link className="ml-auto no-underline" to={next.uri} rel="next">
                  <span className="underline">{parse(next.title)}</span> →
                </Link>
              )}
        </nav>
      </article>
    </Layout>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
  post: wpPost(id: {eq: $id}) {
    id
    excerpt
    content
    title
    date(formatString: "MMMM DD, YYYY")
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
  previous: wpPost(id: {eq: $previousPostId}) {
    uri
    title
  }
  next: wpPost(id: {eq: $nextPostId}) {
    uri
    title
  }
}
`
