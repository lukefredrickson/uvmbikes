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
        bios: nodes {
          uri
          title
          excerpt
          id
          slug
        }
      }
    }
  `)

  return (
    <div>
      <h2>The Team</h2>
      {bios.map(bio => {
        console.log(`/about/${bio.slug}`)
        return (
            <Card key={bio.id}
              header={bio.title}
              body={parse(bio.excerpt)}
              image={bio.featuredImage}
              link={`/about/${bio.slug}`}
            />
          );
      })}
    </div>
  )
}

export default TeamCards;