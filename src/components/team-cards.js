import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"

import Card from "../components/card"

const TeamCards = () => {
  const {
    allBios: {
      bios
    }
  } = useStaticQuery(graphql`
    query TeamBios {
      allBios: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "Bio"}}}}}) {
        bios: edges {
          bio: node {
            excerpt
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
      }
    }
  `)

  console.log(bios)

  return (
    <div>
      <h2>The Team</h2>
      {bios.map(b => {
        console.log(b.bio.title)
        console.log(parse(b.bio.excerpt))
        return (<Card header={b.bio.title} body={parse(b.bio.excerpt)} image={b.bio.featuredImage} link={b.bio.uri} />);
      })}
    </div>
  )
}

export default TeamCards;