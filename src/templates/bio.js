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
      subtitle: `${post.bio.position} | ${post.bio.name}`,
      backgroundcolor: 'blue',
  }

  return (
    <Layout headerInfo={headerInfo} pageId={aboutPage.id}>
      <SEO title={`${post.seo.title}: ${post.bio.name}`} description={`${post.bio.name}, UVM Bikes! ${post.bio.position} | ${post.excerpt}`} />
      <div className="max-w-6xl">
        <article
          itemScope
          itemType="http://schema.org/Article"
        >
        <div>
          <Link className="flex w-min text-2xl mb-10 no-underline py-2 pr-4" to={aboutPage.uri}>
            <div className="flex-none mr-2">←</div>
            <span className="underline">{aboutPage.slug}</span>
          </Link>
        </div>
        <div className="flex flex-col my-10 items-start justify-start lg:flex-row lg:space-x-10">
          <header className="w-auto flex-none m-0">
            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.fluid && (
              <GatsbyImage
                image={featuredImage.fluid}
                alt={featuredImage.alt}
                className="border border-black shadow-lg my-10"
              />
            )}
          </header>

          {!!post.content && (
          <section itemProp="articleBody">
            <h1 className="uppercase my-0">{post.bio.name}</h1>
            <h2 className="font-sans font-normal">{post.bio.position}</h2>
            <hr className="my-6"></hr>
            {content}
          </section>
          )}
        </div>

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
    seo {
      metaDesc
      title
    }
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
`
