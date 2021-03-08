import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Footer = ({ footerInfo }) => {
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
        query FooterNav {
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

    const navItems = items.map((item) => {
    return (
        <Link to={item.connectedNode.node.uri} key={item.order}
        className={"bg-gray-900 text-2xl m-0 py-1 w-full text-center md:text-left font-display font-light text-white border-collapse border-gray-800"}>
            {item.label}
        </Link>
    );
    })

    return (
        <footer className="text-gray-50 ">
            <div className="flex flex-col justify-center items-center md:items-start md:flex-row w-full bg-gray-900 h-auto md:px-20 py-20 md:py-32">
                <div className="flex flex-col justify-center items-center md:items-start w-full my-10 md:my-0 sm:mx-4 md:mx-10 md:w-auto">
                    <h1 className="uppercase  font-display font-semibold text-4xl my-4 md:my-0">UVM Bikes!</h1>
                    <nav className="flex flex-col justify-center items-center md:items-start divide-y-2 border-gray-800 border-2 w-full md:w-auto md:border-none md:divide-y-0">
                        {navItems}
                    </nav>
                </div>
                <div className="flex flex-col text-center md:text-left my-0 w-72 md:w-auto md:my-0 md:px-0 sm:mx-4 md:mx-10">
                    <div className="flex flex-col mb-5">
                        <h4 className="font-extrabold uppercase m-0">Follow UVM Bikes!</h4>
                        <a href="http://www.facebook.com/UVMBIKES" className="font-light">Facebook</a>
                        <a href="http://www.instagram.com/uvmbikes" className="font-light">Instagram</a>
                    </div>
                    <div className="flex flex-col mb-5">
                        <h4 className="font-extrabold uppercase m-0">Get In Touch</h4>
                        <a href="mailto:bikesuvm@gmail.com" className="font-light">bikesuvm@gmail.com</a>
                        <a href="https://list.uvm.edu/cgi-bin/wa?SUBED1=UVMBIKES&A=1" className="font-light">Join our mailing list</a>
                    </div>
                    <div className="flex flex-col mb-5">
                        <h4 className="font-extrabold uppercase m-0">Get Involved</h4>
                        <a href="https://forms.gle/192gy5bJeTmi8ETM8" className="font-light">Sign up to volunteer</a>
                    </div>
                </div>
                <div className="flex flex-col text-center md:text-left w-72 md:w-72 my-0 md:px-0 sm:mx-4 md:mx-10">
                    <div className="flex flex-col mb-5">
                        <h4 className="font-extrabold uppercase m-0">Location</h4>
                        <a href="https://goo.gl/maps/oLcXR8p8rfjvRGoA9" className="font-light">105 Carrigan Dr Burlington, VT 05401</a>
                    </div>
                    <div className="flex flex-col mb-5">
                        <h4 className="font-extrabold uppercase m-0">Hours</h4>
                        <p className="uppercase m-0 font-normal">Due to COVID-19, we are currently closed to the public.</p>
                        <p className="m-0 font-light">Regular: <span className="line-through">Mon-Fri, 10am-3pm</span></p>
                        <p className="m-0 font-light">Summer: <span className="line-through">Mon, 10am-3pm</span></p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-cogs bg-gray-500 flex justify-center items-center py-10">
                <StaticImage src="../img/favicon.png" width={300} aspectRatio={1} alt="UVM Bikes! Logo"/>
            </div>
            <div className="flex flex-col justify-center items-center w-full bg-gray-900 h-40 font-light">
                <span>© {new Date().getFullYear()} UVM Bikes!</span>
                <span>Developed by&nbsp;<a href="https://github.com/lukefredrickson">Luke Fredrickson</a></span>
            </div>
        </footer>
    )
    

}

export default Footer;