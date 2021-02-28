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

const PageTemplate = ({ data: { page } }) => {
  const featuredImage = {
    fluid: page.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: page.featuredImage?.node?.alt || ``,
  }

  const isAbout = page.title === 'About';
  const contentFull = parse(page.content);
  const subtitleObj = contentFull.filter(i => i.type === 'subtitle').shift();
  const subtitle = subtitleObj ? subtitleObj.props.children : undefined;
  const content = contentFull.filter(i => i !== '\n' && i !== '\n\n\n\n' && i.type !== 'subtitle');

  return (
    <Layout pageId={page.id}>
      <Hero title={page.title} subtitle={subtitle}/>
      <SEO title={page.title} />

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

        {!!page.content && (
          <section itemProp="articleBody">
            {content}
            {isAbout ? <TeamCards/> : ''}
          </section>
        )}
      </article>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current page by id
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
      uri

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
