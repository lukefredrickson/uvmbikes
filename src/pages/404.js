import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {

  const headerInfo = {
    header: "404: Not Found",
    subtitle: "Uh oh! You're trying to reach a page that doesn't exist",
    backgroundcolor: "bg-pink-400",
  }

  return (
    <Layout headerInfo={headerInfo} pageId={"404"} >
      <SEO title="404: Not Found" />
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
