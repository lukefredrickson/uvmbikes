const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our pages from the GraphQL server
  const {
    allPosts: {
      posts
    },
    allWpPage: {
      pages
    },
    allBios: {
      bios
    }
  } = await getWpData(gatsbyUtilities)

  const  [ { page: blogPage } ] = pages.filter(({ page }) => page.isPostsPage);
  const  [ { page: aboutPage } ] = pages.filter(({ page }) => page.slug === 'about');

  // Create non-blog pages
  await createPages({ pages, gatsbyUtilities })

  // Create team bios pages
  await createBios({ aboutPage, bios, gatsbyUtilities })

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ blogPage, posts, gatsbyUtilities })

  // And a paginated archive
  await createBlogPostArchive({ blogPage, posts, gatsbyUtilities })
}

const createPages = async ({ pages, gatsbyUtilities }) =>
  Promise.all(
    pages.map(({ page }) => {
      if (!page.isPostsPage) {
        gatsbyUtilities.actions.createPage({
          path: page.uri,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            id: page.id,
          }
        })
      }
    })
  )

const createBios = async ({ aboutPage, bios, gatsbyUtilities }) =>
  Promise.all(
    bios.map(({ bio }) => {
      gatsbyUtilities.actions.createPage({
        path: `/about/${bio.slug}`,
        component: path.resolve(`./src/templates/bio.js`),
        context: {
          id: bio.id,
          aboutPage,
        }
      })
    })
  )

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ blogPage, posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
          blogPage,
        },
      })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ blogPage, posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/blog` : `/blog/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
          blogPage,
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getWpData({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpData {
      # Query all WordPress blog posts sorted by date
      allPosts: allWpPost(sort: {fields: [date], order: DESC}, filter: {categories: {nodes: {elemMatch: {name: {eq: "Blog"}}}}}) {
        posts: edges {
          previous {
            id
          }
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
      # Query all WordPress pages
      allWpPage {
        pages: edges {
          page: node {
            id
            uri
            slug
            isPostsPage
            isFrontPage
            hero {
              header
              subtitle
              backgroundcolor
            }
          }
        }
      }
      # Query all Team Bios
      allBios: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "Bio"}}}}}) {
        bios: edges {
          bio: node {
            id
            slug
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data
}