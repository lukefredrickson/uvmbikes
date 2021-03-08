import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TeamCards from "../components/team-cards"

const PageTemplate = ({ data: { page } }) => {

  const isAbout = page.title === 'About';
  const isVolunteer = page.title === 'Volunteer';
  const content = parse(page.content);
  //const content = contentFull.filter(i => i !== '\n\n\n\n');

  return (
    <Layout headerInfo={page.hero} pageId={page.id}>
      <SEO title={page.title} />
      

      <article
        className="page"
        itemScope
        itemType="http://schema.org/Article"
      >
        {!!page.content && (
          <section itemProp="articleBody">
            {content}
            {isAbout ? <TeamCards/> : ''}
          </section>
        )}
      </article>
      {isVolunteer &&
        <div className="flex justify-center items-center bg-repeat bg-center bg-texture w-full h-60 my-10 bg-red-400">
          <div className="transform-gpu transition-transform ease-in-out hover:-translate-y-0.5">
            <a href="https://forms.gle/192gy5bJeTmi8ETM8" className="font-bold text-3xl bg-white bg-repeat bg-center bg-texture-white p-4 shadow-lg border-2 border-black">
                Sign up to volunteer
            </a>
          </div>
        </div>
      }
    </Layout>
  );
}

export default PageTemplate

export const pageQuery = graphql`query PageById($id: String!) {
  page: wpPage(id: {eq: $id}) {
    id
    content
    title
    uri
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
  }
}
`
