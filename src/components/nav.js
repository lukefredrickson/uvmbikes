import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Nav = ({ pageId }) => {
  const {
    allWpMenu: {
      nodes: [
        {
          menuItems: {
            items
          }
        }
      ]
    },
  } = useStaticQuery(graphql`
    query NavMenu {
      allWpMenu(filter: {slug: {eq: "main"}}) {
        nodes {
          menuItems {
            items: nodes {
              url
              label
              order
              connectedNode {
                node {
                  ... on WpPage {
                    slug
                    id
                    title
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const navItems = items.map((item) => {
    let isCurrentPage = item.connectedNode.node.id === pageId;
    return (
      <Link to={item.connectedNode.node.uri} key={item.order}
        className={"hover:bg-gray-800 px-3 py-1 text-2xl font-display font-normal "
            .concat(isCurrentPage ? "text-yellow-400" : "text-white")
        }>
          {item.label}
      </Link>
    );
  })
    
    

  const mobileNavItems = items.map((item) => {

    let isCurrentPage = item.connectedNode.node.id === pageId;
    return (
      <Link to={item.connectedNode.node.uri} key={item.order}
        className={"hover:bg-gray-800 block px-3 py-2 text-2xl font-normal font-display "
          .concat(isCurrentPage ? "text-yellow-400 bg-gray-800" : "text-white")}>
        {item.label}
      </Link>
    )
  }
    
  )

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="items-center">
            <Link to="/" className="uppercase text-gray-50 font-display font-semibold text-3xl">UVM Bikes!</Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="bg-gray-800 inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                    aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${!mobileMenuOpen && "hidden"} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {mobileNavItems}
        </div>
      </div>
    </nav>
  );

}

export default Nav