import React from "react"
import Nav from "./nav"
import Header from "./header"
import Footer from "./footer"
import Banner from "./banner"

const showBanner = false;

const Layout = ({ children , headerInfo, pageId }) => {
  
  return (
    <div>
      <Nav pageId={pageId}/>
      {showBanner && <Banner 
        largeText='Donate to the LUVmyClub fundraiser! Select "UVM Bikes! Co-op" as your designation.'
        smallText="Donate to the LUVmyClub fundraiser!"
        buttonText="Learn More"
        internalLink="/2021/03/09/luvmyclub-2021-fundraiser/"
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
