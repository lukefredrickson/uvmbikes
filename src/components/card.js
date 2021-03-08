import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby"

const Card = ({ header, body, image, link }) => {
  
  return (
    <div className="transform-gpu transition-transform ease-in-out hover:-translate-y-0.5 max-w-sm bg-repeat bg-center bg-texture 
    bg-gray-900 text-white border-2 border-black shadow-lg overflow-hidden m-6 pb-4">
      <Link to={link}>
    {image?.fluid && (
          <GatsbyImage
            image={image.fluid}
            alt={image.alt}/>
        )}
        </Link>
    <div className="px-6 py-4">
      <div className="text-xl mb-2">
        {link ? 
        <Link to={link}>
          <h3 className="font-extrabold uppercase">{header}</h3>
        </Link>
         : 
        <h3 className="font-extrabold uppercase">{header}</h3>
        }
      </div>
      {body}
    </div>
  </div>
  );
}

export default Card;