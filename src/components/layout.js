import React from "react"
import Nav from "./nav"
import Header from "./header"
import Footer from "./footer"
import Banner from "./banner"

const showBanner = true;

const Layout = ({ children , headerInfo, pageId }) => {
  
  return (
    <div>
      <Nav pageId={pageId}/>
      {showBanner && <Banner 
        largeText='World Ride Movie Night | Saturday, Dec 4th, 7pm in the Davis Center Grand Maple Ballroom'
        smallText='World Ride Movie Night'
        buttonText='Get Tickets'
        link="https://secure.givelively.org/event/world-ride/world-ride-movie-night-uvm"
      />}
      <Header headerInfo={headerInfo}/>
      {pageId !== "404" &&
      <main>
        <div className="flex flex-col items-center mx-auto my-20 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      }
      <Footer></Footer>
    </div>
  )
}

export default Layout
