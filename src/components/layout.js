import React from "react"
import Nav from "./nav"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children , headerInfo, pageId }) => {
  
  return (
    <div>
      <Nav pageId={pageId}/>
      <Header headerInfo={headerInfo}/>

      <main>
        <div className="max-w-6xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
