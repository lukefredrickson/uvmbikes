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
        largeText='UVM SGA RSO Joint Statement Condemning UVM’s Handling of Sexual Misconduct'
        smallText='UVM SGA RSO Joint Statement'
        buttonText='uvmclubs.com'
        link="https://www.uvmclubs.com"
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
