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
      allBios: allWpPost(
        filter: {categories: {nodes: {elemMatch: {name: {eq: "Bio"}}}}}
        sort: {fields: bio___position}
      ) {
        bios: nodes {
          uri
          title
          excerpt
          id
          slug
          bio {
            name
            position
            portrait {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    quality: 100
                    placeholder: TRACED_SVG
                    formats: AUTO
                    transformOptions: {fit: COVER, cropFocus: CENTER}
                    width: 450
                    aspectRatio: 0.9
                  )
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      <h1>The Team</h1>
      <div class="px-4">
        <div class="flex flex-col items-center justify-center md:flex-row md:flex-wrap md:-mx-2">
          {bios.map(bio => {
            const featuredImage = {
              fluid: bio?.bio?.portrait?.localFile?.childImageSharp?.gatsbyImageData,
              alt: bio.featuredImage?.node?.alt || ``,
            }
            return (
                <Card key={bio.id}
                  header={bio.title}
                  body={<h4 className="m-0">{parse(bio.bio.name)}</h4>}
                  image={featuredImage}
                  link={`/about/${bio.slug}`}
                />
              );
          })}
        </div>
      </div>
    </div>
  )
}

export default TeamCards;