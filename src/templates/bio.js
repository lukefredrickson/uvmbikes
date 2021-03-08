import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BioTemplate = ({
    data: { post },
    pageContext: { aboutPage }
  }) => {
  const featuredImage = {
    fluid: post?.bio?.portrait?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const contentFull = parse(post.content);
  const content = contentFull.filter(i => i !== '\n' && i !== '\n\n\n\n' && i.type !== 'subtitle');

  const headerInfo = {
      header: 'THE TEAM',
      subtitle: post.bio.position,
      backgroundcolor: aboutPage.hero.backgroundcolor,
  }

  return (
    <Layout headerInfo={headerInfo} pageId={aboutPage.id}>
      <SEO title={post.title} />
      <div className="max-w-6xl">
        <Link className="text-2xl" to={aboutPage.uri}>
          ← <span className="underline">{aboutPage.slug}</span>
        </Link>
        <article
          className="flex flex-col items-start justify-start lg:flex-row lg:space-x-10"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="w-auto flex-none m-0 mt-10 border-black border-2 shadow-lg">
            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.fluid && (
              <GatsbyImage
                image={featuredImage.fluid}
                alt={featuredImage.alt}
              />
            )}
          </header>

          {!!post.content && (
            <section itemProp="articleBody">
              <h1 className="uppercase">{post.bio.name}</h1>
              <h2 className="font-sans font-normal">{post.bio.position}</h2>
              <hr></hr>
              {content}
            </section>
          )}
        </article>
      </div>
      
    </Layout>
  );
}

export default BioTemplate

export const pageQuery = graphql`query BioById($id: String!) {
  post: wpPost(id: {eq: $id}) {
    id
    content
    excerpt
    title
    slug
    bio {
      name
      position
      portrait {
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: TRACED_SVG
              quality: 100
              formats: AUTO
              width: 400
            )
          }
        }
      }
    }
  }
}
`
