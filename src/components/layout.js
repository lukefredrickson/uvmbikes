import React from "react"
import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div className="global-wrapper">
      <Header/>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} UVM Bikes! Developed by
        {` `}
        <a href="https://github.com/lukefredrickson">Luke Fredrickson</a>
      </footer>
    </div>
  )
}

export default Layout
