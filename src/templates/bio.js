import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import TeamCards from "../components/team-cards"

const BioTemplate = ({ data: { bio } }) => {
  const featuredImage = {
    fluid: bio.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: bio.featuredImage?.node?.alt || ``,
  }

  const contentFull = parse(bio.content);
  const content = contentFull.filter(i => i !== '\n' && i !== '\n\n\n\n' && i.type !== 'subtitle');

  return (
    <Layout pageId={bio.id}>
      <Hero title={bio.title}/>
      <SEO title={bio.title} />

      <article
        className="page"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          )}
        </header>

        {!!bio.content && (
          <section itemProp="articleBody">
            {content}
          </section>
        )}
      </article>
    </Layout>
  )
}

export default BioTemplate

export const pageQuery = graphql`
  query BioById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current page by id
    bio: wpPost(id: { eq: $id }) {
      id
      content
      excerpt
      title
      slug

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
