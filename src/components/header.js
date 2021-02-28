import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const {
    wp: {
      generalSettings: { title: siteTitle },
    },
    allWpMenu: {
      nodes: [
        {
          menuItems: {
            items
          }
        }
      ]
    }
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
      allWpMenu(filter: {slug: {eq: "main"}}) {
        nodes {
          menuItems {
            items: nodes {
              url
              label
              order
            }
          }
        }
      }
    }
  `)


  const navItems = items.map((item) =>
    <li key={item.order}><Link to={item.url}>{item.label}</Link></li>
  )

  return (
    <header className="global-header">
      {/* navbar */}
      <div>
        <Link to='/'>{siteTitle}</Link>
        <nav>{navItems}</nav>
      </div>
    </header>
  );

}

export default Header