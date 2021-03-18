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
      <SEO title={post.seo.title} description={post.excerpt} />
      
      <article
        className="max-w-5xl"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div>
          <Link className="flex w-min text-2xl mb-10 no-underline py-2 pr-4" to={blogPage.uri}>
            <div className="flex-none mr-2">←</div>
            <span className="underline">{blogPage.slug}</span>
          </Link>
        </div>
        <header className="my-10">
          <h1 itemProp="headline">{parse(post.title)}</h1>
          <p>{post.date}</p>
          <hr className="my-6"></hr>
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <GatsbyImage
              className="border-2 border-black shadow-lg mb-10"
              image={featuredImage.fluid}
              alt={featuredImage.alt}/>
          )}
        </header>

        {!!post.content && (
          <section itemProp="articleBody">{parse(post.content)}</section>
        )}

        <nav className="py-10 flex w-full justify-between">
          <div>
            {previous && (
              <div>
                <Link className="flex mr-2 sm:mr-4 no-underline w-32 sm:w-64" to={previous.uri} rel="prev">
                  <div className="flex-none mr-2">←</div>
                  <span className="underline">{parse(previous.title)}</span>
                </Link>
              </div>
            )}
          </div>
          <div>
            {next && (
              <div>
                <Link className="flex justify-end ml-2 sm:ml-4 no-underline text-right w-32 sm:w-64" to={next.uri} rel="next">
                  <span className="underline">{parse(next.title)}</span>
                <div className="flex-none ml-2">→</div>
                </Link>
              </div>
            )}
          </div>
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
    seo {
      metaDesc
      title
    }
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
