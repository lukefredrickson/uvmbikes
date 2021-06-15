import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TeamCards from "../components/team-cards"
import CardLayout from "../components/card-layout"

const PageTemplate = ({ data: { page } }) => {

  const isAbout = page.title === 'About';
  const isVolunteer = page.title === 'Volunteer';
  const content = parse(page.content);

  return (
    <Layout headerInfo={page.hero} pageId={page.id}>
      <SEO title={page.seo.title} description={page.seo.metaDesc} />
      

      <article
        className="max-w-5xl"
        itemScope
        itemType="http://schema.org/Article"
      >
        {!!page.content && !page.isFrontPage && (
          <section itemProp="articleBody">
            {content}
          </section>
        )}
      {isVolunteer &&
        <div className="flex justify-center items-center bg-repeat bg-center bg-texture w-full h-60 my-10 bg-red-400">
          <div className="transform-gpu transition-transform ease-in-out hover:-translate-y-0.5">
            <a href="https://forms.gle/192gy5bJeTmi8ETM8" className="font-bold text-xl sm:text-3xl bg-white bg-repeat bg-center bg-texture-white p-4 shadow-lg border-2 border-black">
                Sign up to volunteer
            </a>
          </div>
        </div>
      }
      </article>
      {page.isFrontPage && page.cards && (
        <CardLayout cards={page.cards} size='max-w-xs sm:max-w-md md:max-w-lg'/>
      )}
      {isAbout ? <TeamCards/> : ''}
      
    </Layout>
  );
}

export default PageTemplate

export const pageQuery = graphql`query PageById($id: String!) {
  page: wpPage(id: {eq: $id}) {
    isPostsPage
    isFrontPage
    id
    content
    title
    uri
    seo {
      title
      metaDesc
    }
    hero {
      header
      subtitle
      backgroundcolor
    }
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG, quality: 100)
          }
        }
      }
    }
    cards {
      cards {
        ... on WpPost {
          content
          id
          card {
            backgroundcolor
            textcolor
            useMap
            isInternalLink
            isCard
            hasLink
            header
            externalLink {
              url
              title
              target
            }
            internalLink {
              ... on WpPage {
                uri
              }
              ... on WpPost {
                uri
              }
            }
            map {
              latitude
              longitude
              zoom
            }
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData (
                  layout: CONSTRAINED
                  quality: 100
                  placeholder: TRACED_SVG
                  formats: AUTO
                  transformOptions: {fit: COVER, cropFocus: CENTER}
                  width: 552
                  aspectRatio: 1.2)
                }
              }
            }
          }
        }
      }
    }
  }
}
`
