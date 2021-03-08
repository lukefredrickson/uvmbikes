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
        sort: {fields: bio___order}
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
    <div className="px-4 mt-10 max-w-7xl flex flex-col justify-center">
      <h1 className="uppercase text-4xl my-6 self-center">The Team</h1>
      <div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap md:-mx-2">
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
  )
}

export default TeamCards;