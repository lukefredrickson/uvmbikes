import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

const Card = ({ header, body, image, link }) => {
  console.log(header)
  console.log(body)
  return (
    <div>
      {image?.fluid && (
        <Image
          fluid={image.fluid}
          alt={image.alt}
          style={{ marginBottom: 50 }}
        />
      )}
      {link ? <Link to={link}>
        <h4>{header}</h4>
      </Link> : <h4>{header}</h4>}
      {body}
    </div>
  )
}

export default Card;