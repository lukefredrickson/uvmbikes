import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby"

const Card = ({ header, body, image, link, map, bgColor, textColor, bgTexture, size }) => {
  
  return (
    <div className={`card ${link && 'transform-gpu transition-transform ease-in-out hover:-translate-y-0.5'} ${size ? size : 'max-w-sm'} bg-repeat bg-center ${bgTexture ? bgTexture : 'bg-texture'} 
    border-2 border-black shadow-lg overflow-hidden w-auto m-4 pb-4 ${bgColor ? bgColor : 'bg-gray-900'} ${textColor ? textColor : 'text-white'} `}>
    {link &&
      <Link to={link || '#'}>
      {image?.fluid && (
            <GatsbyImage
              image={image.fluid}
              alt={image.alt}/>
          )}
          </Link>
    }
    {!link && image?.fluid &&
      <GatsbyImage
        image={image.fluid}
        alt={image.alt}/>
    }
    {!image?.fluid && map}
    
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